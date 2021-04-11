import { Sequelize, DataTypes, Model } from "sequelize"
import { MobileFightModel } from "./types"

export interface UsersModel extends Model {
  id: number
  password: string
  login: number
}

export type UsersModelStatic = typeof Model &
  MobileFightModel<UsersModel> & {
    getByToken: (userId: number) => Promise<UsersModel>
  }

export default function createUsersModel(sequelize: Sequelize) {
  const users = <UsersModelStatic>sequelize.define(
    "users",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      password: DataTypes.STRING,
      login: DataTypes.STRING,
    },
    { timestamps: true },
  )

  users.getByToken = async function(userId) {
    const user = await users.findOne({
      where: {
        id: userId,
      },
    })

    return user
  }

  return users
}
