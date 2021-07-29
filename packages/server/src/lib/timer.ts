import { attach, Store, Subscription, is, createStore, Effect } from "effector"
import { createEvent, createEffect } from "effector"

export function createTimeoutFx<Params>(timeout: number | Store<number>) {
  const abort = createEvent<void>()
  const source: Store<number> = is.store(timeout)
    ? (timeout as Store<number>)
    : createStore(timeout as number)

  // @ts-ignore
  const timeoutFx: Effect<Params, Params> = attach<Params, Params>({
    source,
    mapParams: (params, counter: number) => ({ ...params, counter }),
    effect: createEffect({
      handler({ counter }: Params & { counter: number }) {
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
