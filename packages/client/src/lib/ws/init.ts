/* eslint-disable unicorn/prefer-add-event-listener */

import {
  Store,
  merge,
  forward,
  restore,
  createStore,
  guard,
  sample,
  createEvent,
  combine,
} from "effector"
import { createTimeoutFx } from "@lib/timer"
import { WSClient } from "./client"
import { connectToWs, wsOpened, wsFailed, wsClosed } from "./events"

type Result = [
  {
    $isOpenedWsPipe: Store<boolean>
    $isPendingWsPipe: Store<boolean>
    $isFailedWsPipe: Store<boolean>
    $tryToConnectCounter: Store<number>
  },
  WSClient,
]

export const TRIES_MAX_COUNTER = 3
const MIN_TIMEOUT = 300
const MAX_TIMEOUT = 3000

export function initSocket(): Result {
  const socketClient = new WSClient()
  const tryToConnect = createEvent<string>()

  const $tryToConnectCounter = createStore<number>(0)
  // @ts-ignore
  const $reconnectTimeout: Store<number> = $tryToConnectCounter.map((counter) =>
    counter < TRIES_MAX_COUNTER ? MIN_TIMEOUT : MAX_TIMEOUT,
  )

  const timeoutToWaitingForPing = createTimeoutFx(5000)

  const timeoutToSmoothReconnect = createTimeoutFx($reconnectTimeout)

  const $isOpenedWsPipe: Store<boolean> = createStore(false)
    .on(wsOpened, () => true)
    .on(merge([wsFailed, wsClosed]), () => false)

  const $isFailedWsPipe: Store<boolean> = createStore(false)
    .on(wsOpened, () => false)
    .on(merge([wsFailed, wsClosed]), () => true)

  const $isPendingWsPipe: Store<boolean> = createStore(false)
    .on(wsOpened, () => false)
    .on(tryToConnect, () => true)

  const $lastConnection = restore<{ url: string }>(connectToWs, { url: "" })

  const $canStartNextTimer = combine(
    timeoutToSmoothReconnect.fx.inFlight,
    $isOpenedWsPipe,
    (count, isOpenedWsPipe) => count === 0 && !isOpenedWsPipe,
  )

  $tryToConnectCounter
    .on(tryToConnect, (prev) => (prev < TRIES_MAX_COUNTER ? prev + 1 : prev))
    .reset(wsOpened)

  forward({
    from: connectToWs,
    to: tryToConnect.prepend((it) => it.url),
  })

  forward({
    from: [timeoutToWaitingForPing.fx.done, wsOpened],
    to: [
      timeoutToWaitingForPing.abort,
      timeoutToWaitingForPing.fx.prepend(() => undefined),
    ],
  })

  guard({
    source: wsClosed,
    filter: $canStartNextTimer,
    target: timeoutToSmoothReconnect.fx,
  })

  guard({
    source: sample($lastConnection, timeoutToSmoothReconnect.fx.done),
    filter: (it: { url: string }) => !!it.url,
    target: tryToConnect.prepend((params: { url: string }) => params.url),
  })

  tryToConnect.watch((url) => {
    socketClient.tryConnect(url)
  })

  return [
    {
      $isOpenedWsPipe,
      $isPendingWsPipe,
      $isFailedWsPipe,
      $tryToConnectCounter,
    },
    socketClient,
  ]
}
