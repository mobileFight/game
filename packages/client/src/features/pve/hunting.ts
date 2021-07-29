import { attachPendingModal } from "@features/common"
import { root } from "@lib/root"
import { forward } from "effector"
import { setPVE } from "./api"

const { createEffect, createEvent } = root

export const inPve = createEvent()

export const inPveFx = createEffect(setPVE)

attachPendingModal(inPveFx)

forward({ from: inPve, to: inPveFx })
