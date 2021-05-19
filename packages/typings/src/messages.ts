export type TextMessage = {
  type: "text"
  payload: {
    id: string
    date: string
    text: string
    hero: { id: string; name: string; lvl: number }
  }
}
export type NotificationMessage = {
  type: "notification"
  payload:
    | {
        id: string
        event: "LVL_UP"
        meta: { hero: { id: string; name: string }; nextLvl: number }
      }
    | {
        id: string
        event: "RARE_EQUIP"
        meta: {
          hero: { id: string; name: string }
          equipment: { name: string }
        }
      }
}

export type GlobalChatMessageTypes = TextMessage | NotificationMessage

export type PrivateChatMessageTypes = TextMessage
