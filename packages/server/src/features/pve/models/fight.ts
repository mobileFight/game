import { createEvent, guard, sample, split } from "effector"
import { buildEvent, buildResponse, sendMessageToClientFx } from "../../../ws"
import { $rooms } from "./rooms"
import {
  calculateNextStateFx,
  waitingForBotAttak,
  Game,
  waitingForEndGame,
} from "./branches"

type BaseFightType = {
  result: Game
  params: { req: any }
}

export const attack = createEvent<{ token: string; req: any }>()

const runBotTimerFx = waitingForBotAttak.fx.prepend(
  ({ result }: BaseFightType) => result.client.data,
)

const runGameEndTimerFx = waitingForEndGame.fx.prepend(
  ({ client }: Game) => client.data,
)

const sendResponseFx = sendMessageToClientFx.prepend(
  ({ params, result: { client, ...rest } }: BaseFightType) => ({
    session: client.data,
    message: buildResponse({
      req: params.req,
      data: rest,
      isSuccess: true,
    }),
  }),
)

const sendResponseEventFx = sendMessageToClientFx.prepend(
  ({ result: { client, ...rest } }: BaseFightType) => ({
    session: client.data,
    message: buildEvent({
      method: "pve.bot.attack",
      data: rest,
    }),
  }),
)

sample({
  clock: attack,
  fn: (params) => ({ ...params, step: "hero" }),
  // @ts-ignore
  target: calculateNextStateFx,
})

sample({
  source: $rooms,
  clock: calculateNextStateFx.done,
  fn: (rooms, { params, result }) => ({
    ...rooms,
    [params.token]: result,
  }),
  target: $rooms,
})

sample({
  clock: waitingForBotAttak.fx.done,
  fn: ({ params }) => ({ ...params, step: "bot" }),
  // @ts-ignore
  target: calculateNextStateFx,
})

split({
  source: calculateNextStateFx.done,
  match: ({ params }) => (params.step === "bot" ? "bot" : "hero"),
  cases: {
    bot: [sendResponseEventFx],
    hero: [runBotTimerFx, sendResponseFx],
  },
})

guard({
  clock: calculateNextStateFx.doneData,
  filter: ({ isEnd }) => isEnd,
  target: runGameEndTimerFx,
})

waitingForEndGame.fx.watch(() => {
  console.log("waitingForEndGame run")
})

waitingForEndGame.fx.doneData.watch((d) => {
  console.log("waitingForEndGame dne", { d })
})
sample({
  clock: waitingForEndGame.fx.doneData,
  fn: (session) => ({
    session,
    message: buildEvent({
      method: "pve.game.end",
      data: {},
    }),
  }),
  target: sendMessageToClientFx,
})
