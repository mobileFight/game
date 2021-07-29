import { attachPendingModal } from "@features/common"
import { setPVE } from "@features/pve"
import { root } from "@lib/root"
import { forward } from "effector"

const { createEffect, createEvent } = root

export const attack = createEvent()

export const attackFx = createEffect().use(setPVE)

attachPendingModal(attackFx)

forward({ from: attack, to: attackFx })
