import { createEvent, createStore } from "effector"
import { Game } from "./branches"

export const joinToGame = createEvent<Game>()

export const $rooms = createStore<Record<string, Game>>({}).on(
  joinToGame,
  (rooms, game) => ({ ...rooms, [game.client.data.token]: game }),
)
