import Koa from "koa"
import websockify from "koa-websocket"
import Debug from "debug"
import cookie from "cookie"
import route from "koa-route"
import models, { sequelize } from "./src/models"
import { clients, wsRouter, wsParser } from "./src/ws"
import { registerRoutes } from "./src/ws-routes"

const debug = Debug("mobileFight:index")

export const wsOptions = {
  verifyClient: async (info, done) => {
    const { token = "test_token" } = cookie.parse(
      info.req.headers["cookie"] ?? "",
    )
    const session = await models.sessions.getSessionByToken(token)

    if (session) {
      info.req.data = { session }
      return done(true)
    }

    return done(false)
  },
}

const app = websockify(new Koa(), wsOptions)

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
    debug("server run! on port - 3000")
  })
})
