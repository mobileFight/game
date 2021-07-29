import React, { useEffect, useMemo, useRef } from "react"
import styled from "styled-components"
import { app } from "@lib/pixi"
import frame from "@assets/frame.png"
import { createPVEController } from "../models"

const PreviewWrapper = styled.div<{ locationImage: string }>`
  position: relative;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: 38px 49px;
  background-size: 438px;
  min-width: 438px;
  min-height: 328px;
  background-image: url(${(props) => props.locationImage});

  > img {
    max-width: 100%;
  }

  > * {
    user-select: none;
  }

  > canvas {
    position: absolute;
    z-index: 2;
    left: 0;
    width: 100%;
  }
`

export function createFightPreview() {
  const model = createPVEController({ app })

  function FightPreview({ locationImage }: { locationImage: string }) {
    const ref = useRef<HTMLDivElement | null>(null)
    const stage = useMemo(() => model.createStage(), [])

    useEffect(() => {
      const unsubscribe = stage.subscribeToTicker()
      ref.current?.append(app.view)

      return () => {
        unsubscribe()
      }
    }, [stage])

    return (
      <PreviewWrapper locationImage={locationImage} ref={ref}>
        <img src={frame} alt="frame" draggable={false} />
      </PreviewWrapper>
    )
  }

  return {
    FightPreview,
    model,
  }
}
