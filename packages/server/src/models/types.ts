import { Model, BuildOptions } from "sequelize"

export type MobileFightModel<M> = {
  associate: (models: { users: typeof Model }) => void
  new (values?: object, options?: BuildOptions): M
}
