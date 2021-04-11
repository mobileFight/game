import models from "../../models"
import { LocationModel } from "../../models/locations"
import { HandlerCtx } from "../../types"

export async function handleLocation({
  req,
  successToClient,
}: HandlerCtx<{
  location: LocationModel
  children: Array<LocationModel>
}>) {
  const { locationId } = req.payload
  const location = await models.locations.getLocationById(locationId)

  successToClient(location)
}
