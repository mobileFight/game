/* eslint-disable unicorn/prefer-add-event-listener */

import { wsClosed, wsFailed } from "./events"
import { DeferredType, defer } from "./defer"

// TODO: Не много не то
// Переделал на свежую версию без багов - нужно пушнуть
export class WSClient {
  id: number

  connection: WebSocket | null | undefined

  requestMap: Map<number, DeferredType<unknown>>

  defaultError: Error

  constructor() {
    this.id = 0
    this.requestMap = new Map()
    this.defaultError = new Error("some socket error")
  }

  rejectAllRequests() {
    const requests = [...this.requestMap.values()]

    requests.forEach((request) => {
      request.reject(new Error("SOCKET_NOT_OPENED"))
    })
  }

  tryConnect(url: string): Promise<true> {
    return new Promise((resolve, reject) => {
      this.close()

      console.log("[ws]: try connect")

      this.connection = new WebSocket(url)

      this.connection.onopen = () => {
        resolve(true)
        console.log("[ws]: opened")
      }

      // @ts-ignore
      this.connection.onerror = (error: Error) => {
        reject(error)
        wsFailed(error)
        this.rejectAllRequests()
      }

      this.connection.onclose = (reason) => {
        wsClosed()
      }

      this.connection.onmessage = ({ data }) => {
        const parsedData = JSON.parse(String(data)) as {
          type: string
          isSuccess: boolean
          method: StorageManager
          payload: unknown
        }
        // @ts-ignore
        const { reqId } = parsedData
        const request = this.requestMap.get(reqId)

        console.log("[ws]: message", { parsedData })

        if (request) {
          this.requestMap.delete(reqId)

          if (parsedData.type === "result" && parsedData.isSuccess) {
            const { method, payload } = parsedData

            // @ts-ignore
            request.resolve({
              method,
              payload,
            })

            return
          }

          if (parsedData.type === "result" && !parsedData.isSuccess) {
            // @ts-ignore
            request.reject(toApiError(parsedData.error))

            return
          }

          request.reject(this.defaultError)
        }
      }
    })
  }

  send<Done>(method: string, payload: unknown): Done {
    const request = defer()
    const reqId = ++this.id
    const message = {
      reqId,
      method,
      version: 1,
      payload: payload ?? {},
    }

    console.log("[ws]: send", { message })

    // @ts-ignore
    this.requestMap.set(reqId, request)

    switch (this.connection?.readyState) {
      case WebSocket.OPEN: {
        setImmediate(() => {
          if (this.connection) {
            this.connection.send(JSON.stringify(message))
          }
        })

        break
      }

      default: {
        setImmediate(() => {
          request.reject(new Error("SOCKET_NOT_OPENED"))
        })
      }
    }

    // @ts-ignore
    return request.req
  }

  close() {
    if (this.connection) {
      this.connection.close()
      this.rejectAllRequests()
      this.requestMap = new Map()

      wsClosed()
    }
  }
}
