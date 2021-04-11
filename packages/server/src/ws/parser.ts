import { WsRequest } from "./types"

export function wsParser(message: string): WsRequest | void {
  const result: WsRequest | void = JSON.parse(message)

  if (result) {
    return result
  }

  return undefined
}
