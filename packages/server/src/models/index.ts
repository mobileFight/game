import fs from "fs"
import path from "path"
import { Sequelize as SequelizeBase } from "sequelize"
import { db as dbConfig } from "../config"
import { SessionModelStatic } from "./sessions"
import { UsersModelStatic } from "./users"
import { LocationModelStatic } from "./locations"

type MainModels = {
  sessions: SessionModelStatic
  users: UsersModelStatic
  locations: LocationModelStatic
}

const basename = path.basename(__filename)
// @ts-ignore
const models: MainModels = {}

export const sequelize = new SequelizeBase(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    dialect: dbConfig.dialect,
    storage: path.resolve("db/database.sqlite"),
  },
)

fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file !== "types.js",
  )
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file))

    models[model.name] = model
  })

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models)
  }

  models[modelName].Models = models
})

export default models

export const Sequelize = SequelizeBase
