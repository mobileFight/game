import { attach, Store, Subscription, is, createStore } from "effector"
import { root } from "./root"

const { createEvent, createEffect } = root

export function createTimeoutFx(timeout: number | Store<number>) {
  const abort = createEvent<void>()
  const source: Store<number> = is.store(timeout)
    ? (timeout as Store<number>)
    : createStore(timeout as number)

  // @ts-ignore
  const timeoutFx = attach<void, void>({
    source,
    mapParams: (_, counter: number) => counter,
    effect: createEffect({
      handler(counter: number) {
        let abortWatcher: Subscription

        return new Promise((resolve, reject) => {
          const id = setTimeout(resolve, counter)

          if (abort) {
            abortWatcher = abort.watch(() => {
              clearTimeout(id)
              reject(new Error("timeout rejected"))
            })
          }
        }).finally(() => {
          if (abortWatcher) {
            abortWatcher()
          }
        })
      },
    }),
  })

  return {
    fx: timeoutFx,
    abort,
  }
}
