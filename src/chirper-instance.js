import ChirperSamples from './chirper-samples.js'

export default class {
  constructor (context) {
    this.context = context
    this.buffer = null
    this.source = null
  }

  get data () {
    if (this.buffer === null) {
      return null
    }
    return this.buffer.getChannelData(0)
  }

  create (sampleId, option) {
    const length = option.rate * option.second
    if (length <= 0) {
      return
    }
    this.buffer = this.context.createBuffer(1, length, option.rate)
    ChirperSamples[sampleId](this.data, option)

    for (let i = 0, ii = this.data.length; i < ii; i ++) {
      if (this.data[i] < - 1.0) {
        this.data[i] = - 1.0
      } else if (this.data[i] > 1.0) {
        this.data[i] = 1.0
      }
    }
  }

  play (volume = 0.5) {
    if (this.context.state === 'running') {
      this.stop()
      this.source = this.context.createBufferSource()
      this.source.buffer = this.buffer

      // ボリュームの即時変更
      const gainNode = this.context.createGain()
      this.source.connect(gainNode)
      gainNode.connect(this.context.destination)
      gainNode.gain.value = volume

      this.source.start(this.context.currentTime)
    }
  }

  stop () {
    if (this.source !== null) {
      this.source.stop()
    }
  }

  save (fileName) {
    const audioBlob = this.createAudioBlob()
    this.download(fileName, audioBlob)
  }

  // WANT: 現状 44100 Hz 固定なので可変にしたい
  // SEE: https://qiita.com/HirokiTanaka/items/56f80844f9a32020ee3b
  createAudioBlob () {
    const audioData = [ this.buffer.getChannelData(0) ]
    const encodeWAV = function (samples, sampleRate) {
      const buffer = new ArrayBuffer(44 + samples.length * 2)
      const view = new DataView(buffer)
      const writeString = function (view, offset, string) {
        for (let i = 0; i < string.length; i ++) {
          view.setUint8(offset + i, string.charCodeAt(i))
        }
      }
      const floatTo16BitPCM = function (output, offset, input) {
        for (let i = 0; i < input.length; i ++, offset += 2) {
          const s = Math.max(- 1, Math.min(1, input[i]))
          output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true)
        }
      }
      writeString(view, 0, 'RIFF') // RIFFヘッダ
      view.setUint32(4, 32 + samples.length * 2, true) // これ以降のファイルサイズ
      writeString(view, 8, 'WAVE') // WAVEヘッダ
      writeString(view, 12, 'fmt ') // fmtチャンク
      view.setUint32(16, 16, true) // fmtチャンクのバイト数
      view.setUint16(20, 1, true) // フォーマットID
      view.setUint16(22, 1, true) // チャンネル数
      view.setUint32(24, sampleRate, true) // サンプリングレート
      view.setUint32(28, sampleRate * 2, true) // データ速度
      view.setUint16(32, 2, true) // ブロックサイズ
      view.setUint16(34, 16, true) // サンプルあたりのビット数
      writeString(view, 36, 'data') // dataチャンク
      view.setUint32(40, samples.length * 2, true) // 波形データのバイト数
      floatTo16BitPCM(view, 44, samples) // 波形データ
      return view
    }
    const mergeBuffers = function (audioData) {
      let sampleLength = 0
      for (let i = 0; i < audioData.length; i ++) {
        sampleLength += audioData[i].length
      }
      const samples = new Float32Array(sampleLength)
      let sampleIdx = 0
      for (let i = 0; i < audioData.length; i ++) {
        for (let j = 0; j < audioData[i].length; j ++) {
          samples[sampleIdx] = audioData[i][j]
          sampleIdx ++
        }
      }
      return samples
    }
    const dataview = encodeWAV(mergeBuffers(audioData), this.context.sampleRate)
    return new Blob([ dataview ], { type: 'audio/wav' })
  }

  download (fileName, blob) {
    const link = document.createElement('a')
    link.download = fileName
    link.href = URL.createObjectURL(blob)
    link.target = '_blank'
    link.click()
  }
}
