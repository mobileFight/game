import { Sequelize, DataTypes, Model } from "sequelize"
import { Location } from "@mobile-fight/typings"
import { MobileFightModel } from "./types"

export type LocationModel = Model & Location

export type LocationModelStatic = typeof Model &
  MobileFightModel<LocationModel> & {
    getLocationById: (
      locationId: number,
    ) => Promise<{
      location: Location
      children: Array<Location>
    } | null>
  }

export default function createLocationsModel(sequelize: Sequelize) {
  const locations = <LocationModelStatic>sequelize.define(
    "locations",
    {
      name: DataTypes.STRING,
      img: DataTypes.STRING,
      has_magazine: DataTypes.INTEGER,
      children: DataTypes.STRING,
    },
    { timestamps: true },
  )

  // Очень плохой запрос
  // TODO: изучить рекурсивные алгоритмы хранения данных в бд
  locations.getLocationById = async (locationId) => {
    const location = await locations.findOne({
      where: {
        id: locationId,
      },
    })

    if (location) {
      const { children } = location
      const ids = children !== "" ? children.split(".") : []

      const childrenLocations = await locations
        .findAll({
          where: {
            id: ids,
          },
        })
        .then((locations) => locations.map((it) => it.toJSON() as Location))

      return {
        location: location.toJSON() as Location,
        children: childrenLocations,
      }
    }

    return null
  }

  return locations
}
