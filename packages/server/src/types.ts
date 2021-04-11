import { WsRequest, ClientSession } from "./ws"

export type HandlerCtx<T> = {
  req: WsRequest
  session: ClientSession
  successToClient: (arg0: T) => void
  failedToClient: (arg0: Error) => void
}
