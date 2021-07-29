import { socketClient } from "@lib/ws"

export async function setPVE() {
  const data = await socketClient.send<{ payload: unknown }>("pve.set", {})

  return data.payload as any
}

export async function attack() {
  const data = await socketClient.send<{ payload: unknown }>(
    "pve.user.attack",
    {},
  )

  return data.payload as any
}
