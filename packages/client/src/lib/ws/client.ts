/* eslint-disable unicorn/prefer-add-event-listener */

import { receivedWsEvent, wsClosed, wsFailed, wsOpened } from "./events"
import { DeferredType, defer } from "./defer"

export class WSClient {
  id: number

  connection: WebSocket | null | undefined

  requestMap: Map<number, { request: DeferredType<unknown>; message: any }>

  defaultError: Error

  constructor() {
    this.id = 0
    this.requestMap = new Map()
    this.defaultError = new Error("some socket error")
  }

  handleWsClose() {
    this.rejectAllRequests()
    wsClosed()
  }

  rejectAllRequests() {
    const requests = [...this.requestMap.values()]

    requests.forEach(({ request }) => {
      request.reject(this.defaultError)
    })

    this.requestMap = new Map()
  }

  tryConnect(url: string): void {
    this.connection = new WebSocket(url)

    this.connection.onopen = () => {
      wsOpened()
    }

    // @ts-ignore
    this.connection.onerror = (error: Error) => {
      this.connection?.close()
      wsFailed(error)
    }

    this.connection.onclose = () => {
      this.handleWsClose()
    }

    this.connection.onmessage = ({ data }) => {
      const parsedData = JSON.parse(String(data)) as {
        type: string
        isSuccess: boolean
        method: string
        payload: unknown
      }
      // @ts-ignore
      const { id } = parsedData
      const { request } = this.requestMap.get(id) ?? {}

      console.log("WS: [onmessage]", {
        parsedData,
        hasRequest: Boolean(request),
        isResult: parsedData.type === "result",
      })

      if (request) {
        this.requestMap.delete(id)

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
          request.reject(new Error(parsedData.error))

          return
        }

        request.reject(this.defaultError)
      }

      if (parsedData.type === "event") {
        // @ts-ignore
        receivedWsEvent({
          type: "event",
          event: parsedData.method,
          payload: parsedData.payload,
        })
      }
    }
  }

  silentSend(request: DeferredType<any>, message: any) {
    // @ts-ignore
    this.requestMap.set(message.id, { request, message })

    setImmediate(() => {
      switch (this.connection?.readyState) {
        case WebSocket.OPEN: {
          if (this.connection) {
            console.log("WS: [send]", {
              message,
            })
            this.connection.send(JSON.stringify(message))
          }

          break
        }

        default: {
          request.reject(this.defaultError)
        }
      }
    })
  }

  send<Done>(method: string, payload: unknown): Promise<Done> {
    const request = defer()
    const id = ++this.id
    const message = {
      id,
      method,
      version: 1,
      payload: payload ?? {},
    }

    this.silentSend(request, message)

    // @ts-ignore
    return request.req
  }
}
