import { createCharacter } from "@lib/pixi"
import { AnimatedIcons } from "@lib/pixi/icons"
import { root } from "@lib/root"
import { merge } from "effector"
import * as PIXI from "pixi.js"
import { GROUND_Y, HERO_X, TARGET_X } from "../constants"
import { attachEffect } from "../lib"

const { createEvent } = root

export function createPVEController({ app }: { app: PIXI.Application }) {
  const animation = createEvent<string>()
  const targetAnimation = createEvent<string>()
  const attackCompleted = createEvent()
  const targetAttackCompleted = createEvent()
  const showEffect = createEvent<{
    target: "hero" | "target"
    type: "counter"
    isDebuff?: boolean
    value: string
  }>()

  function createStage() {
    const container = new PIXI.Container()
    const state = {
      icons: [] as AnimatedIcons[],
      character: createCharacter({
        x: HERO_X,
        y: GROUND_Y,
        animation,
        attackCompleted,
      }),
      target: createCharacter({
        x: TARGET_X,
        y: GROUND_Y,
        animation: targetAnimation,
        attackCompleted,
        isTarget: true,
      }),
    }

    container.addChild(state.character.sprite)
    container.addChild(state.target.sprite)
    app.stage.addChild(container)

    state.icons.forEach((it) => {
      container.addChild(it.sprite)
    })

    function subscribeToTicker() {
      const buffRemove = showEffect.watch((params) => {
        attachEffect({
          ...params,
          addSprite: (it) => {
            container.addChild(it.sprite)
            state.icons.push(it)
          },
        })
      })

      function ticker(delta: number) {
        const currentIcons = [...state.icons]
        state.character.update(delta)
        state.target.update(delta)

        currentIcons.forEach((it) => {
          if (it.state.removed) {
            container.removeChild(it.sprite)
            state.icons = state.icons.filter((icon) => icon !== it)
          } else {
            it.update(delta)
          }
        })
      }

      const stageTicker = app.ticker.add(ticker)

      return () => {
        buffRemove()
        stageTicker.remove(ticker)
        state.character.unsubscribe()
        state.target.unsubscribe()
        container.removeChild(state.character.sprite)
        container.removeChild(state.target.sprite)
      }
    }

    return {
      character: state.character,
      attackCompleted,
      subscribeToTicker,
    }
  }

  return {
    animation,
    targetAnimation,
    attackCompleted: merge([attackCompleted, targetAttackCompleted]),
    createStage,
    showEffect,
  }
}
