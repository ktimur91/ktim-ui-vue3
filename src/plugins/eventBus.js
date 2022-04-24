import emitter from 'tiny-emitter/instance'

export const $busOn = (...args) => emitter.on(...args)
export const $busOnce = (...args) => emitter.once(...args)
export const $busOff = (...args) => emitter.off(...args)
export const $busEmit = (...args) => emitter.emit(...args)
