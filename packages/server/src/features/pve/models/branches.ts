import { createEffect, attach, Effect } from "effector"
import { createTimeoutFx } from "../../../lib/timer"
import { Client, ClientSession } from "../../../ws"
import { $rooms } from "./rooms"

export type Game = {
  client: Client
  hero: any
  bot: any
  whoIsAttack: "bot" | "hero"
  isEnd: boolean
}

export const waitingForBotAttak = createTimeoutFx<ClientSession>(3000)
export const waitingForEndGame = createTimeoutFx<ClientSession>(3000)

// @ts-ignore
export const calculateNextStateFx: Effect<
  { token: string; req: any; step: "hero" | "bot" },
  Game
> = attach({
  source: $rooms,
  mapParams: ({ req, token, step }, rooms) => ({ ...rooms[token], req, step }),
  effect: createEffect(
    ({ client, bot, hero, step }: Game & { step: "hero" | "bot" }) =>
      new Promise((res) => {
        const current = step === "bot" ? bot : hero
        const target = step === "bot" ? hero : bot
        const targetKey = step === "bot" ? "hero" : "bot"
        const nextTargetHP = Math.max(
          target.runtimeHP - current.characteristics.attack,
          0,
        )

        res({
          isEnd: nextTargetHP === 0 || current.runtimeHP === 0,
          client,
          whoIsAttack: targetKey,
          [targetKey]: {
            ...target,
            runtimeHP: nextTargetHP,
          },
          [step]: current,
        })
      }),
  ),
})
