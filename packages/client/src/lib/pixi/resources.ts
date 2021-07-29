import { root } from "@lib/root"
import * as PIXI from "pixi.js"

const { createStore } = root

export const Resources = {
  character: {
    name: "character",
    animations: {
      idle: "idle",
      running: "running",
      attack: "attack",
      jumping: "jumping",
      forward: "forward",
    },
  },
  icons: {
    name: "icons",
  },
}

const loader = PIXI.Loader.shared

const { createEffect } = root

export const loadAssetsFx = createEffect<void, void>().use(
  () =>
    new Promise((res) => {
      loader
        .add(Resources.character.name, "http://localhost:3001/adventurer.json")
        .add(Resources.icons.name, "http://localhost:3001/icons.png")
        .load(res)
    }),
)

export const $assetsLoaded = createStore(false).on(
  loadAssetsFx.doneData,
  () => true,
)

export const baseTextures: {
  numbers: Record<string, PIXI.Texture>
  operators: Record<string, PIXI.Texture>
  effects: Record<string, PIXI.Texture>
} = {
  numbers: {},
  operators: {},
  effects: {},
}

$assetsLoaded.updates.watch((loaded) => {
  if (loaded) {
    const resource = PIXI.Loader.shared.resources[Resources.icons.name]

    for (let i = 0; i < 10; i++) {
      baseTextures.numbers[i] = new PIXI.Texture(
        // @ts-ignore
        resource.texture,
        new PIXI.Rectangle(i * 28, 112, 28, 28),
      )
    }

    baseTextures.operators.plus = new PIXI.Texture(
      // @ts-ignore
      resource.texture,
      new PIXI.Rectangle(10 * 28, 112, 28, 28),
    )

    baseTextures.operators.minus = new PIXI.Texture(
      // @ts-ignore
      resource.texture,
      new PIXI.Rectangle(11 * 28, 112, 28, 28),
    )

    baseTextures.effects.hp = new PIXI.Texture(
      // @ts-ignore
      resource.texture,
      new PIXI.Rectangle(10 * 28, 28, 28, 28),
    )
  }
})
