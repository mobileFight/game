import { WsRequest, ClientSession } from "./ws"

export type HandlerCtx<T> = {
  req: WsRequest
  session: ClientSession
  successToClient: (arg0: T) => Promise<true>
  failedToClient: (arg0: Error) => Promise<true>
}
