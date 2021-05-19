import { createEffect, forward, restore } from "effector"
import { createGate } from "effector-react"
import { getLocation, LocationResponce } from "@features/arena"
import { attachPendingModal } from "@features/common"

export const gate = createGate<string>()

const loadLocationFx = createEffect<string, LocationResponce>().use(getLocation)

export const $location = restore(loadLocationFx.doneData, null)
export const $pending = loadLocationFx.pending

forward({ from: gate.state, to: loadLocationFx })

attachPendingModal(loadLocationFx)
