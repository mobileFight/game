export class SpriteAnimationManager {
  steps: { frameCount: number; name: string }[]
  index: number
  handler: (arg0: string) => void
  onEnd: () => void
  isStopped: boolean

  constructor(
    handler: (arg0: string) => void,
    steps: { frameCount: number; name: string }[],
    onEnd: () => void,
  ) {
    this.handler = handler
    this.isStopped = true
    this.index = 0
    this.steps = steps
    this.onEnd = onEnd
  }

  run() {
    this.isStopped = false
  }

  update(onStepChanged: (arg0: string) => void) {
    if (this.isStopped) {
      return
    }

    const frames = this.steps.reduce((acc, step) => {
      acc.push(...Array.from({ length: step.frameCount }, () => step.name))

      return acc
    }, [] as string[])

    this.handler(frames[this.index])

    if (this.index > 0 && frames[this.index] !== frames[this.index - 1]) {
      onStepChanged(frames[this.index])
    }

    if (this.index === frames.length - 1) {
      this.isStopped = true
      this.index = 0
      this.onEnd()
      return
    }

    this.index += 1
  }
}
