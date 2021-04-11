import { WsRequest } from "./types"
import { ClientSession } from "./clients"

import { compose } from "ramda"

type Params = { req: WsRequest; session: ClientSession }
type Handler = <T>(arg0: Params) => T

type Route3 = <R, R1, R2>(
  route: string,
  h1: (arg0: Params) => R,
  h2: (arg0: R) => R1,
  h3?: (arg0: R1) => R2,
) => void

class WsRouter {
  routes = new Map<string, Handler>()

  addRoute: Route3 = (route, ...handlers) => {
    // @ts-ignore
    const handler = compose(...handlers.filter(Boolean).reverse())

    this.routes.set(route, handler as Handler)
  }

  releaseHandler(req: WsRequest, session: ClientSession) {
    if (this.routes.has(req.method)) {
      const handler = this.routes.get(req.method)

      handler({ req, session })
    }
  }
}

export const wsRouter = new WsRouter()
