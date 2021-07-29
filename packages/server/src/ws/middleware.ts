import {
  buildResponse,
  ClientSession,
  sendMessageToClient,
  broadcastMessage,
  broadcastMessageToSelctedClients,
} from "./clients"
import { WsRequest } from "./types"

export function requestMiddleware({
  req,
  session,
}: {
  req: WsRequest
  session: ClientSession
}) {
  return {
    req,
    session,
    successToClient: <T>(data: T) => {
      return sendMessageToClient({
        session,
        message: buildResponse({ req, data, isSuccess: true }),
      })
    },
    failedToClient: (error: Error) => {
      return sendMessageToClient({
        session,
        message: buildResponse({ req, error, isSuccess: false }),
      })
    },
    broadcastMessage: <T>(data: T) => {
      broadcastMessage({
        message: buildResponse({ req, data, isSuccess: true }),
      })
    },
    broadcastMessageToSelctedClients: <T>(data: T, tokens: Array<string>) => {
      broadcastMessageToSelctedClients({
        tokens,
        message: buildResponse({ req, data, isSuccess: true }),
      })
    },
  }
}
