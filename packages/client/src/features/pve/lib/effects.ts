import { AnimatedIcons, createIcon } from "@lib/pixi/icons"
import { GROUND_Y, HERO_EFFECT_X, TARGET_EFFECT_X } from "../constants"

type Props = {
  target: "hero" | "target"
  value: string
  isDebuff?: boolean
  addSprite: (arg0: AnimatedIcons) => void
}

export function attachEffect({ addSprite, ...params }: Props) {
  const operator = createIcon({
    x: params.target === "hero" ? HERO_EFFECT_X - 28 : TARGET_EFFECT_X - 28,
    y: GROUND_Y,
    value: params.isDebuff ? "minus" : "plus",
    type: "operators",
  })

  const number = createIcon({
    x: params.target === "hero" ? HERO_EFFECT_X : TARGET_EFFECT_X,
    y: GROUND_Y,
    value: params.value,
    type: "numbers",
  })

  const hp = createIcon({
    x: params.target === "hero" ? HERO_EFFECT_X + 28 : TARGET_EFFECT_X + 28,
    y: GROUND_Y,
    value: "hp",
    type: "effects",
  })

  ;[operator, number, hp].forEach(addSprite)
}
