import path from "path"

const dbConfig = require(path.resolve("database.json"))

const { NODE_ENV = "development" } = process.env

export const db = dbConfig[NODE_ENV]
export const appName = "mobileFight"
