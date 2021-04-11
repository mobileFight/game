type RequiredPayload = { reqId: number }

export enum LocationPaths {
  getLocation = "get.location",
}

export type GetLocationParams = {
  method: LocationPaths.getLocation
  payload: { locationId: number }
} & RequiredPayload
