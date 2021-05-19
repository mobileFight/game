import { Location } from "@mobile-fight/typings"
import { socketClient } from "@lib/ws"

export type LocationResponce = {
  location: Location
  children: Location[]
}

export async function getLocation(locationId: string) {
  const data = await socketClient.send<{ payload: LocationResponce }>(
    "get.location",
    {
      locationId,
    },
  )

  return data.payload
}
