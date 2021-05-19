import { createEvent, createStore, Effect, forward } from "effector"

export const openPendingModal = createEvent()
export const closePendingModal = createEvent()

export const $pendingModalOpened = createStore(false)
  .on(openPendingModal, () => true)
  .on(closePendingModal, () => false)

export function attachPendingModal<Params, Done>(fx: Effect<Params, Done>) {
  forward({ from: fx, to: openPendingModal })
  forward({ from: fx.finally, to: closePendingModal })
}
