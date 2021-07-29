/* eslint-disable no-param-reassign */
/* eslint-disable prefer-template */
/* eslint-disable no-console */
// import React, { useEffect } from "react"
// import ReactDOM from "react-dom"
// import { useStore } from "effector-react"
// import { Normalize } from "styled-normalize"
// import { RoutersHistoryController, routePaths } from "@lib/histories"
// import { connectToWs, wsStates } from "@lib/ws"
// import { App } from "./app"
// import { GlobalPendingModal } from "./features/common"
// import { Splash, ModalRootProvider } from "./ui/organisms"
// import { lightTheme } from "./ui/themes"
// import { ThemeController } from "./lib/theme-context"
// import * as serviceWorker from "./serviceWorker"
// import { GlobalStyles } from "./global-styles"

// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

// const initialEntry = routePaths.location.replace(":id", "1")
// const initialThemes = { lightTheme }

// function Main() {
//   const isOpenedWsPipe = useStore(wsStates.$isOpenedWsPipe)

//   useEffect(() => {
//     const id = setTimeout(() => {
//       connectToWs({ url: "ws://localhost:3001" })
//     }, 1000)

//     return () => {
//       clearTimeout(id)
//     }
//   }, [])

//   if (!isOpenedWsPipe) {
//     return <Splash />
//   }

//   return (
//     <RoutersHistoryController initialEntries={[initialEntry]}>
//       <App />
//     </RoutersHistoryController>
//   )
// }

// const root = document.querySelector("#root")

// if (root) {
//   ReactDOM.render(
//     <ThemeController themes={initialThemes} initialTheme="lightTheme">
//       <ModalRootProvider>
//         <>
//           <GlobalPendingModal />
//           <Normalize />
//           <GlobalStyles />
//           <Main />
//         </>
//       </ModalRootProvider>
//     </ThemeController>,
//     root,
//   )
// }

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA

// const isProd = process.env.NODE_ENV === "production"

// if (isProd) {
//   // @ts-ignore
//   serviceWorker.register()
// }

import * as PIXI from "pixi.js"
import { ISkeletonData, SpineParser, Spine } from "pixi-spine"

// eslint-disable-next-line unicorn/number-literal-case
const app = new PIXI.Application({ backgroundColor: 0xffff })
const { renderer } = app

app.stage.interactive = true

PIXI.Loader.shared
  .add("hero", "http://localhost:3001/hero/hero.json")
  .add("hero2", "http://localhost:3001/hero2/hero2.json")
  .load(onAssetsLoaded)

const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a
// const clamp = (a: numb, min = 0, max = 1) => Math.min(max, Math.max(min, a));
// const invlerp = (x, y, a) => clamp((a - x) / (y - x));
// const range = (x1, y1, x2, y2, a) => lerp(x2, y2, invlerp(x1, y1, a));

function degreesToRadians(degrees: number) {
  return degrees * (Math.PI / 180)
}

abstract class Default {
  abstract sprite: PIXI.Sprite
  abstract state: Record<
    string,
    {
      texture: PIXI.Texture<PIXI.Resource> | undefined
      position: { x: number; y: number }
      anchor: { x: number; y: number }
    }
  >

  applyTexture(texturename: string) {
    if (true) {
      // @ts-ignore
      this.sprite.texture = this.state[texturename].texture || undefined
      this.sprite.x = this.state[texturename].position.x
      this.sprite.y = this.state[texturename].position.y
      this.sprite.anchor.set(
        this.state[texturename].anchor.x,
        this.state[texturename].anchor.y,
      )
    }
  }
}

class FlagTextures extends Default {
  sprite: PIXI.Sprite
  state: Record<
    string,
    {
      texture: PIXI.Texture<PIXI.Resource> | undefined
      position: { x: number; y: number }
      anchor: { x: number; y: number }
    }
  >

  constructor(resource: PIXI.ILoaderResource) {
    super()
    this.sprite = new PIXI.Sprite()
    this.state = {
      up: {
        texture: resource.textures?.["flag1.png"],
        position: { x: -11, y: -38 },
        anchor: { x: 0.5, y: 0.5 },
      },
      down: {
        texture: resource.textures?.["flag2.png"],
        position: { x: -14, y: -38 },
        anchor: { x: 0.5, y: 0.5 },
      },
    }
    this.applyTexture("up")
  }
}

class Weapon extends Default {
  sprite: PIXI.Sprite
  state: Record<
    string,
    {
      texture: PIXI.Texture<PIXI.Resource> | undefined
      position: { x: number; y: number }
      anchor: { x: number; y: number }
    }
  >

  constructor(resource: PIXI.ILoaderResource) {
    super()
    this.sprite = new PIXI.Sprite()
    this.sprite.rotation = degreesToRadians(-5)
    this.state = {
      common: {
        texture: resource.textures?.["weapon.png"],
        position: { x: 0, y: 25 },
        anchor: { x: 0.2, y: 0.3 },
      },
      toAttack: {
        texture: resource.textures?.["weapon.png"],
        position: { x: -15, y: 5 },
        anchor: { x: 0.2, y: 0.3 },
      },
    }
    this.applyTexture("common")
  }
}

class WeaponBrush extends Default {
  sprite: PIXI.Sprite
  weapon: Weapon
  state: Record<
    string,
    {
      texture: PIXI.Texture<PIXI.Resource> | undefined
      position: { x: number; y: number }
      anchor: { x: number; y: number }
    }
  >

  constructor(resource: PIXI.ILoaderResource) {
    super()
    this.sprite = new PIXI.Sprite()
    this.weapon = new Weapon(resource)
    this.sprite.rotation = degreesToRadians(-5)
    this.state = {
      common: {
        texture: resource.textures?.["hand-weapon.png"],
        position: { x: 0, y: 25 },
        anchor: { x: 0.5, y: 0.5 },
      },
      toAttack: {
        texture: resource.textures?.["hand-weapon.png"],
        position: { x: -15, y: 5 },
        anchor: { x: 0.5, y: 0.5 },
      },
    }
    this.applyTexture("common")
  }

  applyTexturesForBrash(name: string) {
    this.applyTexture(name)
    this.weapon.applyTexture(name)
  }
}

class Hand extends Default {
  brush: WeaponBrush
  sprite: PIXI.Sprite
  state: Record<
    string,
    {
      texture: PIXI.Texture<PIXI.Resource> | undefined
      position: { x: number; y: number }
      anchor: { x: number; y: number }
    }
  >

  constructor(resource: PIXI.ILoaderResource) {
    super()
    this.sprite = new PIXI.Sprite()
    this.brush = new WeaponBrush(resource)
    this.state = {
      common: {
        texture: resource.textures?.["hand-common.png"],
        position: { x: 0, y: 25 },
        anchor: { x: 0.5, y: 1 },
      },
      toAttack: {
        texture: resource.textures?.["hand-to-attack.png"],
        position: { x: 0, y: 0 },
        anchor: { x: 0.5, y: 1 },
      },
    }
    this.applyTexture("common")
  }

  applyTexturesForHand(name: string) {
    this.applyTexture(name)
    this.brush.applyTexturesForBrash(name)
  }
}

class Animation {
  steps: { frameCount: number; name: string }[]
  index: number
  handler: (arg0: string) => void
  onEnd: () => void
  isStopped: boolean

  constructor(
    handler: (arg0: string) => void,
    steps: { frameCount: number; name: string }[],
    onEnd: () => void,
  ) {
    this.handler = handler
    this.isStopped = true
    this.index = 0
    this.steps = steps
    this.onEnd = onEnd
  }

  run() {
    this.isStopped = false
  }

  update(onStepChanged: (arg0: string) => void) {
    if (this.isStopped) {
      return
    }

    const frames = this.steps.reduce((acc, step) => {
      acc.push(...Array.from({ length: step.frameCount }, () => step.name))

      return acc
    }, [] as string[])

    this.handler(frames[this.index])

    if (this.index > 0 && frames[this.index] !== frames[this.index - 1]) {
      onStepChanged(frames[this.index])
    }

    if (this.index === frames.length - 1) {
      this.isStopped = true
      this.index = 0
      this.onEnd()
      return
    }

    this.index += 1
  }
}

function onAssetsLoaded() {
  function create(isTarget?: boolean) {
    const resource = isTarget
      ? PIXI.Loader.shared.resources.hero2
      : PIXI.Loader.shared.resources.hero

    const state = {
      idleStep: 0.2,
      tourceY: 0,
      currentFlagTexture: null,
      currAnimation: "idle",
    }
    const tourceContainer = new PIXI.Container()
    const weaponHandContainer = new PIXI.Container()
    const container = new PIXI.Container()
    const legsContainer = new PIXI.Container()

    const head = new PIXI.Sprite(resource.textures?.["face-common.png"])
    const body = new PIXI.Sprite(resource.textures?.["tource-common.png"])
    const legs = new PIXI.Sprite(resource.textures?.["legs-common.png"])

    const shield = new PIXI.Sprite(resource.textures?.["shield-opened.png"])
    const shieldBrush = new PIXI.Sprite(resource.textures?.["hand-shield.png"])

    const shoes = new PIXI.Sprite(resource.textures?.["shoes-common.png"])

    const flag = new FlagTextures(resource)
    const hand = new Hand(resource)

    const attackAnimation = new Animation(
      (step) => hand.applyTexturesForHand(step),
      [
        { frameCount: 10, name: "toAttack" },
        { frameCount: 5, name: "common" },
      ],
      () => {
        state.currAnimation = "idle"
      },
    )

    const animations = {
      idle: (timestemp: number) => {
        if (state.tourceY > 1 || state.tourceY < -1) {
          state.idleStep *= -1

          if (state.idleStep < 0) {
            flag.applyTexture("up")
          } else {
            flag.applyTexture("down")
          }
        }

        state.tourceY += state.idleStep * timestemp
        tourceContainer.y = state.tourceY
      },
      attack: (timestemp: number) => {
        attackAnimation.update(console.log)
      },
    }

    head.y = -20
    head.x = 17
    legsContainer.y = 47
    legsContainer.x = -2
    weaponHandContainer.y = 6
    weaponHandContainer.x = -28
    shieldBrush.rotation = -1.57
    shieldBrush.x = 30
    shieldBrush.y = 7

    shoes.y = 15
    container.scale.x = isTarget ? -1 : 1

    shield.anchor.set(0.1, 0.4)
    legs.anchor.set(0.5)
    shoes.anchor.set(0.5)

    shieldBrush.anchor.set(0.5)
    head.anchor.set(0.5, 0.5)
    body.anchor.set(0.5, 0.5)

    container.x = isTarget ? app.view.width / 2 + 100 : app.view.width / 2 - 100
    container.y = app.view.height / 2

    weaponHandContainer.addChild(hand.sprite)
    weaponHandContainer.addChild(hand.brush.weapon.sprite)
    weaponHandContainer.addChild(hand.brush.sprite)

    body.addChild(head)
    body.addChild(weaponHandContainer)

    tourceContainer.addChild(flag.sprite)
    tourceContainer.addChild(shield)
    tourceContainer.addChild(shieldBrush)
    tourceContainer.addChild(body)

    legsContainer.addChild(legs)
    legsContainer.addChild(shoes)

    container.interactive = true

    container.addChild(legsContainer)
    container.addChild(tourceContainer)

    container.on("click", () => {
      state.currAnimation = "attack"
      attackAnimation.run()
    })

    function update(timestemp: number) {
      // @ts-ignore
      animations[state.currAnimation](timestemp)
    }

    return {
      container,
      update,
    }
  }

  const p1 = create()
  const p2 = create(true)

  app.stage.addChild(p1.container)
  app.stage.addChild(p2.container)

  app.ticker.add((timestemp) => {
    p1.update(Math.min(timestemp, 1))
    p2.update(Math.min(timestemp, 1))
  })

  document.body.append(app.view)
}
