import * as PIXI from "pixi.js"
import { baseTextures } from "./resources"

export type AnimatedIcons = {
  sprite: PIXI.Sprite
  update: (delta: number) => void
  state: { removed: boolean }
}

type Props = {
  x: number
  y: number
  value: string
  type: "numbers" | "operators" | "effects"
}

export function createIcon({ x, y, value, type }: Props): AnimatedIcons {
  const state = {
    removed: false,
  }

  const sprite = new PIXI.Sprite(baseTextures[type][value])

  sprite.x = x
  sprite.y = y
  sprite.anchor.set(0.5)

  function update(delta: number) {
    sprite.y -= 1 * delta

    if (sprite.y <= 100) {
      state.removed = true
    }
  }

  return {
    sprite,
    update,
    state,
  }
}
