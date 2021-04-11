import { wsRouter, LocationPaths } from "./ws"
import { handleLocation } from "./features/locations"
import {
  buildResponse,
  ClientSession,
  sendMessageToClient,
  broadcastMessage,
  broadcastMessageToSelctedClients,
} from "./ws/clients"
import { WsRequest } from "./ws/types"

function requestMiddleware({
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
      sendMessageToClient({
        session,
        message: buildResponse({ req, data, isSuccess: true }),
      })
    },
    failedToClient: (error: Error) => {
      sendMessageToClient({
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

export function registerRoutes() {
  wsRouter.addRoute(
    LocationPaths.getLocation,
    requestMiddleware,
    handleLocation,
  )
}
