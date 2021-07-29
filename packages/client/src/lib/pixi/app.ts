import * as PIXI from "pixi.js"

export function createApp() {
  return new PIXI.Application({
    width: 480,
    height: 272,
    antialias: true,
    transparent: true,
    resolution: 1,
  })
}

export const app = createApp()
