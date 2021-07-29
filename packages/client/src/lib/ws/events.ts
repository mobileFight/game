import { createEvent } from "effector"

export const receivedWsEvent = createEvent<
  | {
      type: "event"
      event: "pve.bot.attack"
      payload: any
    }
  | {
      type: "event"
      event: "test"
      payload: string
    }
>()
export const wsOpened = createEvent<void>()
export const wsClosed = createEvent<void>()
export const wsFailed = createEvent<Error>()
export const connectToWs = createEvent<{ url: string }>()
