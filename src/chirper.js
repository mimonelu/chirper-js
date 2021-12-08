import ChirperEasings from './chirper-easings.js'
import ChirperInstance from './chirper-instance.js'
import ChirperSamples from './chirper-samples.js'

class Chirper {
  constructor () {
    this.context = new (window.AudioContext || window.webkitAudioContext)()

    // WebKit ではユーザージェスチャーのイベントリスナー内でこれが必要
    // SEE: https://developers.google.com/web/updates/2017/09/autoplay-policy-changes
    window.addEventListener('click', () => {
      if (this.context.state !== 'running') {
        this.context.resume().then(() => {})
      }
    })
  }

  create (sampleId, option) {
    const optionSanitized = option || {}
    optionSanitized.rate = optionSanitized.rate === undefined ? 44100 : optionSanitized.rate
    optionSanitized.second = optionSanitized.second === undefined ? 1.0 : optionSanitized.second
    optionSanitized.volume = optionSanitized.volume === undefined ? 0.5 : optionSanitized.volume
    optionSanitized.volumeEasing = optionSanitized.volumeEasing === undefined ? 'none' : optionSanitized.volumeEasing
    optionSanitized.special = optionSanitized.special === undefined ? 1.0 : optionSanitized.special
    optionSanitized.specialEasing = optionSanitized.specialEasing === undefined ? 'none' : optionSanitized.specialEasing
    const instance = new ChirperInstance(this.context)
    instance.create(sampleId, optionSanitized)
    return instance
  }
}

window.Chirper = Chirper
window.ChirperInstance = ChirperInstance
window.ChirperEasings = ChirperEasings
window.ChirperSamples = ChirperSamples
