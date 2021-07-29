import Koa from "koa"
import websockify from "koa-websocket"
import Debug from "debug"
import serve from "koa-static"
import cors from "koa-cors"
import cookie from "cookie"
import route from "koa-route"
import models, { sequelize } from "./src/models"
import { clients, wsRouter, wsParser } from "./src/ws"
import { registerRoutes } from "./src/ws-routes"

const debug = Debug("mobileFight:index")
const { NODE_ENV } = process.env
const defaultToken = NODE_ENV !== "production" ? "test_token" : ""

export const wsOptions = {
  verifyClient: async (info, done) => {
    const { token = defaultToken } = cookie.parse(
      info.req.headers["cookie"] ?? "",
    )
    const session = await models.sessions.getSessionByToken(token)

    if (session) {
      info.req.data = { session: { ...session, token: token } }
      return done(true)
    }

    return done(false)
  },
}

const app = websockify(new Koa(), wsOptions)

app.use(cors())
app.use(serve("./src/assets"))

app.ws.use(
  route.all("/", (ctx) => {
    const { session } = ctx.req.data
    const clientData = { token: session.token, userId: session.user_id }

    clients.set(session.token, {
      ws: ctx.websocket,
      status: "connected",
      data: clientData,
    })

    ctx.websocket.on("message", (message: string) => {
      const request = wsParser(message)

      if (request) {
        wsRouter.releaseHandler(request, clientData)
      }
    })

    ctx.websocket.on("close", () => {
      clients.set(session.token, {
        ws: undefined,
        status: "closed",
        data: clientData,
      })
    })

    ctx.websocket.on("error", () => {
      clients.set(session.token, {
        ws: undefined,
        status: "error",
        data: clientData,
      })
    })
  }),
)

sequelize.authenticate().then(async () => {
  debug("db connected")

  registerRoutes()

  app.listen(3001, () => {
    debug("server run! on port - 3001")
  })
})
