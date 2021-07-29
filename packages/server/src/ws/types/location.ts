type RequiredPayload = { reqId: number }

export enum LocationPaths {
  getLocation = "get.location",
  inPVPQueue = "pvp.queue.set",
  goToPVE = "pve.set",
}

export enum PVEPaths {
  goToPVE = "pve.set",
  userAttach = "pve.user.attack",
}

export type GetLocationParams = {
  method: LocationPaths.getLocation
  payload: { locationId: number }
} & RequiredPayload

export type PveUserAttackParams = {
  method: "pve.user.attack"
  payload: {}
} & RequiredPayload
