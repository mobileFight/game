import { Location } from "@mobile-fight/typings"
import models from "../../models"
import { HandlerCtx } from "../../types"

type Params = HandlerCtx<{
  location: Location
  children: Array<Location>
}>

export async function handleLocation({ req, successToClient }: Params) {
  // @ts-ignore
  const { locationId } = req.payload
  const location = await models.locations.getLocationById(locationId)

  await successToClient(location)
}
