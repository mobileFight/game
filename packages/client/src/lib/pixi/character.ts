import * as PIXI from "pixi.js"
import { Event } from "effector"
import { Resources } from "./resources"

export type AnimatedCharacter = {
  sprite: PIXI.AnimatedSprite
  update: (delta: number) => void
  unsubscribe: () => void
}

type Props = {
  x: number
  y: number
  animation: Event<string>
  attackCompleted: Event<void>
  isTarget?: boolean
}

export function createCharacter({
  x,
  y,
  animation,
  attackCompleted,
  isTarget = false,
}: Props): AnimatedCharacter {
  const characterState = {
    animation: Resources.character.animations.idle,
    y,
  }
  const resource = PIXI.Loader.shared.resources[Resources.character.name]
  const sprite = new PIXI.AnimatedSprite(
    resource.spritesheet!.animations[Resources.character.animations.idle],
  )
  sprite.x = x
  sprite.y = y
  sprite.anchor.set(0.5)
  // @ts-ignore
  sprite.scale = new PIXI.Point(isTarget ? -2 : 2, 2)
  sprite.animationSpeed = 0.13

  sprite.play()

  const animationWatcher = animation.watch((state) => {
    if (state !== characterState.animation) {
      characterState.animation = state

      if (state === Resources.character.animations.attack) {
        sprite.stop()
        sprite.loop = false
        sprite.onComplete = () => {
          sprite.loop = true
          characterState.animation = Resources.character.animations.idle
          attackCompleted()
        }
      }
    }
  })

  function update(delta: number) {
    const currentTextures = resource.spritesheet!.animations[
      characterState.animation
    ]

    if (currentTextures !== sprite.textures) {
      sprite.textures = currentTextures
      sprite.play()
    }
  }

  function unsubscribe() {
    animationWatcher()
  }

  return {
    sprite,
    update,
    unsubscribe,
  }
}
