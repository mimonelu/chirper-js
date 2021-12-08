import ChirperEasings from './chirper-easings.js'

const PI02 = Math.PI * 0.5
const PI2 = Math.PI * 2.0
const frandom = (min, max) => Math.random() * (max - min) + min

export default {
  noise (channel, option) {
    for (let i = 0, ii = channel.length; i < ii; i ++) {
      const random = frandom(- 1.0, 1.0) * option.special * ChirperEasings[option.specialEasing](i, ii)
      channel[i] = random * option.volume * ChirperEasings[option.volumeEasing](i, ii)
    }
  },

  sin (channel, option) {
    for (let i = 0, ii = channel.length; i < ii; i ++) {
      const special = option.rate * option.special * ChirperEasings[option.specialEasing](i, ii)
      channel[i] = Math.sin(i / ii * Math.PI * special) * option.volume * ChirperEasings[option.volumeEasing](i, ii)
    }
  },

  cos (channel, option) {
    for (let i = 0, ii = channel.length; i < ii; i ++) {
      const special = option.special * ChirperEasings[option.specialEasing](i, ii)
      const co = Math.cos(i / ii * Math.PI * 2048 * special)
      channel[i] = co * option.volume * ChirperEasings[option.volumeEasing](i, ii)
    }
  },

  tan (channel, option) {
    for (let i = 0, ii = channel.length; i < ii; i ++) {
      const special = option.special * ChirperEasings[option.specialEasing](i, ii)
      const co = Math.tan(i / ii * Math.PI * 1024 * special)
      channel[i] = co * option.volume * ChirperEasings[option.volumeEasing](i, ii)
    }
  },

  square (channel, option) {
    let j = 1
    for (let i = 0, ii = channel.length; i < ii; i ++) {
      if ((i % Math.round(512.0 * option.special * ChirperEasings[option.specialEasing](i, ii))) === 0) {
        j *= - 1
      }
      channel[i] = j * option.volume * ChirperEasings[option.volumeEasing](i, ii)
    }
  },

  triangle (channel, option) {
    let j = 0
    let k = - 1.0
    for (let i = 0, ii = channel.length; i < ii; i ++) {
      if (k >= 1.0) {
        j = - 0.2 * option.special * ChirperEasings[option.specialEasing](i, ii)
      } else if (k <= - 1.0) {
        j = 0.2 * option.special * ChirperEasings[option.specialEasing](i, ii)
      }
      k += j
      channel[i] = k * option.volume * ChirperEasings[option.volumeEasing](i, ii)
    }
  },

  and (channel, option) {
    for (let i = 0, ii = channel.length; i < ii; i ++) {
      const special = option.special * ChirperEasings[option.specialEasing](i, ii)
      const co = Math.sin(i / ii * Math.PI * (ii & i) * special)
      channel[i] = co * option.volume * ChirperEasings[option.volumeEasing](i, ii)
    }
  },

  or (channel, option) {
    for (let i = 0, ii = channel.length; i < ii; i ++) {
      const special = option.special * ChirperEasings[option.specialEasing](i, ii)
      const co = Math.sin(i / ii * Math.PI * (ii | i) * special)
      channel[i] = co * option.volume * ChirperEasings[option.volumeEasing](i, ii)
    }
  },

  explosion (channel, option) {
    let random = 0
    for (let i = 0, ii = channel.length; i < ii; i ++) {
      if ((i % Math.round(64.0 * option.special * ChirperEasings[option.specialEasing](i, ii))) === 0) {
        random = frandom(- 1.0, 1.0)
      }
      channel[i] = random * option.volume * ChirperEasings[option.volumeEasing](i, ii)
    }
  },

  spring (channel, option) {
    let j = 0
    for (let i = 0, ii = channel.length; i < ii; i ++) {
      j = i / ii
      channel[i] = ((i % Math.round(256.0 * option.special * ChirperEasings[option.specialEasing](i, ii))) === 0 ? 1 : (j - 0.5) * 2.0) * (1.0 - j) * option.volume * ChirperEasings[option.volumeEasing](i, ii)
    }
  },

  warp (channel, option) {
    for (let i = 0, ii = channel.length; i < ii; i ++) {
      const special = option.special * ChirperEasings[option.specialEasing](i, ii)
      const co = Math.sin(Math.pow(i / ii * Math.PI, 2 * special) * 1000)
      channel[i] = co * option.volume * ChirperEasings[option.volumeEasing](i, ii)
    }
  },

  bell (channel, option) {
    let j = 1
    for (let i = 0, ii = channel.length; i < ii; i ++) {
      const co = option.rate / (2048.0 * option.special * ChirperEasings[option.specialEasing](i, ii)) * j
      if ((i % 128) === 0) {
        j *= - 1
      }
      channel[i] = Math.sin(i / co * Math.PI) * option.volume * ChirperEasings[option.volumeEasing](i, ii)
    }
  },

  phone (channel, option) {
    for (let i = 0, ii = channel.length; i < ii; i ++) {
      channel[i] = Math.sin(i * 0.05) * Math.sin(i / option.rate * Math.PI * 16 * option.special * ChirperEasings[option.specialEasing](i, ii)) * option.volume * ChirperEasings[option.volumeEasing](i, ii)
    }
  },

  energy (channel, option) {
    for (let i = 0, ii = channel.length; i < ii; i ++) {
      const r = Math.sin((i * 128 * option.special * ChirperEasings[option.specialEasing](i, ii)) / ii * Math.PI * 2 * Math.sin((i * 32 * option.special * ChirperEasings[option.specialEasing](i, ii)) / ii * Math.PI * 2))
      channel[i] = r * option.volume * ChirperEasings[option.volumeEasing](i, ii)
    }
  },

  ping (channel, option) {
    for (let i = 0, ii = channel.length; i < ii; i ++) {
      channel[i] = Math.sin((i * 2048 * option.special * ChirperEasings[option.specialEasing](i, ii)) / ii * PI2) * option.volume * ChirperEasings[option.volumeEasing](i, ii)
    }
  },

  chime (channel, option) {
    let j = 1
    for (let i = 0, ii = channel.length, k = 1; i < ii; i ++) {
      if ((i % Math.round(64.0 * option.special * ChirperEasings[option.specialEasing](i, ii))) === 0) {
        j *= - 1
      }
      if ((i % Math.round(192.0 * option.special * ChirperEasings[option.specialEasing](i, ii))) === 0) {
        k *= - 1
      }
      const l = (j + k) / 2
      channel[i] = l * option.volume * ChirperEasings[option.volumeEasing](i, ii)
    }
  },

  cackle (channel, option) {
    let j = 0
    for (let i = 0, ii = channel.length; i < ii; i ++) {
      j = i / ii * Math.PI
      channel[i] = Math.sin(j * 512.0 * Math.sin(j * 8 * option.special * ChirperEasings[option.specialEasing](i, ii))) * option.volume * ChirperEasings[option.volumeEasing](i, ii)
    }
  },

  space (channel, option) {
    for (let i = 0, ii = channel.length; i < ii; i ++) {
      const special = option.special * ChirperEasings[option.specialEasing](i, ii)
      const co1 = i / ii * Math.PI * 128
      const co2 = Math.sin(co1 * Math.cos(co1) * special)
      channel[i] = co2 * option.volume * ChirperEasings[option.volumeEasing](i, ii)
    }
  },

  synthesizer (channel, option) {
    let j = 0
    for (let i = 0, ii = channel.length; i < ii; i ++) {
      j = i / ii * Math.PI
      channel[i] = Math.sin(j * 8 * Math.sin(j * 1024.0 * option.special * ChirperEasings[option.specialEasing](i, ii))) * option.volume * ChirperEasings[option.volumeEasing](i, ii)
    }
  },

  electone (channel, option) {
    for (let i = 0, ii = channel.length; i < ii; i ++) {
      const j = Math.round((option.special * ChirperEasings[option.specialEasing](i, ii) * 1000) / 200) * 200
      const special = Math.sin(i / ii * Math.PI * j)
      channel[i] = special * option.volume * ChirperEasings[option.volumeEasing](i, ii)
    }
  },

  echo (channel, option) {
    let j = 0
    for (let i = 0, ii = channel.length; i < ii; i ++) {
      j = i / ii * Math.PI
      channel[i] = Math.sin(j * 2048.0 * option.special * ChirperEasings[option.specialEasing](i, ii)) * Math.sin(j * 8) * option.volume * ChirperEasings[option.volumeEasing](i, ii)
    }
  },

  floating (channel, option) {
    let j = 0
    for (let i = 0, ii = channel.length; i < ii; i ++) {
      j = i / ii * Math.PI
      channel[i] = Math.sin(j * (1024.0 * option.special * ChirperEasings[option.specialEasing](i, ii)) / Math.cos(j * 0.5)) * option.volume * ChirperEasings[option.volumeEasing](i, ii)
    }
  },

  zap (channel, option) {
    let j = 0
    for (let i = 0, ii = channel.length; i < ii; i ++) {
      j = i / ii * Math.PI
      channel[i] = Math.sin(j * 128.0 / Math.sin(j * 16.0 * option.special * ChirperEasings[option.specialEasing](i, ii))) * option.volume * ChirperEasings[option.volumeEasing](i, ii)
    }
  },

  bounce (channel, option) {
    let j = 0
    for (let i = 0, ii = channel.length; i < ii; i ++) {
      j = i / ii * Math.PI
      channel[i] = Math.sin(j * 32 * (Math.round(i / ii * 100.0 * option.special * ChirperEasings[option.specialEasing](i, ii)) % 2 === 0 ? 1 : 64)) * option.volume * ChirperEasings[option.volumeEasing](i, ii)
    }
  },

  surprise (channel, option) {
    let j = 0
    for (let i = 0, ii = channel.length; i < ii; i ++) {
      j = i / ii
      channel[i] = Math.sin(j * (Math.sin(j * PI02) * Math.PI) * 2048.0 * option.special * ChirperEasings[option.specialEasing](i, ii)) * option.volume * ChirperEasings[option.volumeEasing](i, ii)
    }
  },

  despair (channel, option) {
    let j = 0
    for (let i = 0, ii = channel.length; i < ii; i ++) {
      j = i / ii
      channel[i] = Math.sin(j * (Math.cos(j * Math.PI * 0.25) * Math.PI) * 2048.0 * option.special * ChirperEasings[option.specialEasing](i, ii)) * option.volume * ChirperEasings[option.volumeEasing](i, ii)
    }
  },

  robot (channel, option) {
    const walks = Array.from(Array(8)).map(() => frandom(0, 1.0))
    for (let i = 0, ii = channel.length; i < ii; i ++) {
      const special = option.special * ChirperEasings[option.specialEasing](i, ii)
      const step = Math.floor(i / ii * 8.0)
      const co = Math.sin(i / ii * Math.PI * 4096 * walks[step] * special)
      channel[i] = co * option.volume * ChirperEasings[option.volumeEasing](i, ii)
    }
  },
}
