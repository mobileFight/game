import React, { useEffect } from "react"
import styled from "styled-components"
import { useStore } from "effector-react"
import { FightTemplate } from "@mobileFight/ui/templates"
import { Button } from "@mobileFight/ui/atoms"
import { previewPve, attacked, $state, start } from "./model"

const HP = styled.p`
  font-weight: bold;
  color: red;
  font-size: 14px;
`

export function PVEPage() {
  const state = useStore($state)

  useEffect(() => {
    start()
  }, [])

  if (!state) {
    return null
  }

  return (
    <FightTemplate>
      <previewPve.FightPreview locationImage="https://mmoquest.com/img/location/1.jpg" />
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 0,
          zIndex: 3,
          width: "100%",
          paddingLeft: 50,
          paddingRight: 50,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <HP>{state.hero}</HP>
        <HP>{state.bot}</HP>
      </div>
      <Button
        attackButon
        onClick={() => {
          attacked()
        }}
      />
    </FightTemplate>
  )
}
