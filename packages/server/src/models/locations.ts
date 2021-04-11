import { Sequelize, DataTypes, Model } from "sequelize"
import { MobileFightModel } from "./types"

export interface LocationModel extends Model {
  id: number
  name: string
  has_magazine: number
  img: string
  children: string
}

export type LocationModelStatic = typeof Model &
  MobileFightModel<LocationModel> & {
    getLocationById: (
      locationId: number,
    ) => Promise<{
      location: LocationModel
      children: Array<LocationModel>
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

      const childrenLocations = await locations.findAll({
        where: {
          id: ids,
        },
      })

      return {
        location,
        children: childrenLocations,
      }
    }

    return null
  }

  return locations
}
