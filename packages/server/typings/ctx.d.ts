import { IncomingMessage as IM } from "http"
import { SessionModel } from "../src/models/sessions"

import "koa"

declare module "koa" {
  interface IncomingMessage extends IM {
    data: { session: SessionModel }
  }
}
