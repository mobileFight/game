import { createStore, forward, guard, sample } from "effector"
import { root } from "@lib/root"
import { Resources } from "@lib/pixi"
import { receivedWsEvent } from "@lib/ws"
import { attack, createFightPreview, inPve, inPveFx } from "@features/pve"
import { attachPendingModal } from "@features/common"

const { createEffect, createEvent } = root

export const start = createEvent<void>()
export const previewPve = createFightPreview()
export const attacked = createEvent<void>()

export const botAttacked = guard(receivedWsEvent, {
  filter: (it) => it.event === "pve.bot.attack",
})

const attackFx = createEffect(attack)

export const $state = createStore<{ hero: 0; bot: 0 } | null>(null)
  .on(botAttacked, (_, { payload }) => ({
    hero: payload.hero.runtimeHP,
    bot: payload.bot.runtimeHP,
  }))
  .on([attackFx.doneData, inPveFx.doneData], (_, payload) => ({
    hero: payload.hero.runtimeHP,
    bot: payload.bot.runtimeHP,
  }))

attachPendingModal(attackFx)

forward({ from: attacked, to: attackFx })

sample({
  clock: attackFx.doneData,
  fn: () => Resources.character.animations.attack,
  target: [
    previewPve.model.animation,
    previewPve.model.showEffect.prepend(() => ({
      type: "counter",
      value: "1",
      isDebuff: true,
      target: "target",
    })),
  ],
})

sample({
  clock: botAttacked,
  fn: () => Resources.character.animations.attack,
  target: [
    previewPve.model.targetAnimation,
    previewPve.model.showEffect.prepend(() => ({
      type: "counter",
      value: "2",
      isDebuff: true,
      target: "hero",
    })),
  ],
})

forward({ from: start, to: inPve })
