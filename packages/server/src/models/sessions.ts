import { Sequelize, DataTypes, Model } from "sequelize"
import { MobileFightModel } from "./types"

export interface SessionModel extends Model {
  id: number
  token: string
  user_id: number
}

export type SessionModelStatic = typeof Model &
  MobileFightModel<SessionModel> & {
    getSessionByToken: (token: string) => Promise<SessionModel | null>
  }

export default function createSessionsModel(sequelize: Sequelize) {
  const sessions = <SessionModelStatic>sequelize.define(
    "sessions",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      token: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
    },
    { timestamps: true },
  )

  sessions.associate = (models) => {
    // @ts-ignore
    sessions.hasOne(models.users)
  }

  sessions.getSessionByToken = (token) => {
    return sessions.findOne({
      where: {
        token,
      },
    })
  }

  return sessions
}
