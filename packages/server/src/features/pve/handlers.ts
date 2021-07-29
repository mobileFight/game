import Debug from "debug"
import { HandlerCtx } from "../../types"
import { clients, PVEPaths, wsParser } from "../../ws"
import { createBotHero } from "../bot"
import { attack, joinToGame } from "./models"

type Params = HandlerCtx<{}>

const debug = Debug("mobileFight:pve")

function createHero() {
  return {
    runtimeHP: 100,
    canAttack: true,
    characteristics: {
      hp: 100,
      attack: 50,
    },
  }
}

export async function handlePVE({ session, successToClient }: Params) {
  const bot = createBotHero()
  const hero = createHero()
  const client = clients.get(session.token)

  if (client && client.ws) {
    const game = {
      bot,
      hero,
      whoIsAttack: "hero" as "bot" | "hero",
      isEnd: false,
    }

    joinToGame({ ...game, client })

    function messageListener(message: string) {
      const request = wsParser(message)

      if (request && request.method === PVEPaths.userAttach) {
        attack({ token: session.token, req: request })
      }
    }

    client.ws.on("message", messageListener)

    debug("pve register")

    await successToClient(game)
  }
}
