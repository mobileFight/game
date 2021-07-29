import {
  createEvent,
  createEffect,
  forward,
  createStore,
  sample,
  guard,
} from "effector"
import { createTimeoutFx } from "../../lib/timer"
import {
  buildEvent,
  buildResponse,
  Client,
  ClientSession,
  sendMessageToClientFx,
} from "../../ws"

type Game = {
  client: Client
  hero: any
  bot: any
}

const pveEndTimeout = createTimeoutFx(2000)
const botAttakTimeout = createTimeoutFx<{ session: ClientSession }>(2000)

export const conectToGame = createEvent<Game>()
export const attack = createEvent<{ token: string; req: any }>()

export const $games = createStore<Record<string, Game>>({}).on(
  conectToGame,
  (games, game) => ({ ...games, [game.client.data.token]: game }),
)

export const computedNextStepFx = createEffect<Game & { req: any }, Game>(
  ({ client, bot, hero }) =>
    new Promise((res, rej) => {
      res({
        client,
        bot: {
          ...bot,
          runtimeHP: Math.max(bot.runtimeHP - hero.characteristics.attack, 0),
        },
        hero,
      })
    }),
)

export const computedNextStepFromBotFx = createEffect<Game, Game>(
  ({ client, bot, hero }) =>
    new Promise((res, rej) => {
      res({
        client,
        hero: {
          ...hero,
          runtimeHP: Math.max(hero.runtimeHP - bot.characteristics.attack, 0),
        },
        bot,
      })
    }),
)

sample({
  source: $games,
  clock: attack,
  fn: (games, { token, req }) => ({ ...games[token], req }),
  target: computedNextStepFx,
})

sample({
  source: $games,
  clock: computedNextStepFx.done,
  fn: (games, { params, result }) => ({
    ...games,
    [params.client.data.token]: result,
  }),
  target: $games,
})

sample({
  clock: computedNextStepFx.done,
  fn: ({ params, result: { bot, hero } }) => ({
    session: params.client.data,
    message: buildResponse({
      req: params.req,
      data: { bot, hero },
      isSuccess: true,
    }),
  }),
  target: [sendMessageToClientFx, botAttakTimeout.fx],
})

sample({
  source: $games,
  clock: botAttakTimeout.fx.done,
  fn: (games, { params }) => games[params.session.token],
  target: computedNextStepFromBotFx,
})

sample({
  clock: computedNextStepFromBotFx.done,
  fn: ({ params, result: { bot, hero } }) => ({
    session: params.client.data,
    message: buildEvent({
      method: "pve.bot.attack",
      data: { bot, hero },
    }),
  }),
  target: sendMessageToClientFx,
})

guard({
  clock: computedNextStepFx.done,
  filter: ({ result }) =>
    result.bot.runtimeHP === 0 || result.hero.runtimeHP === 0,
  target: sendMessageToClientFx.prepend(({ params }) => ({
    session: params.client.data,
    message: buildEvent({
      data: { winner: "user" },
      method: "pve.end",
    }),
  })),
})
