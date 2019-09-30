import { run, app, popEvent } from '@bara/core'
import { ExpressServer } from '.'

const whenExpressStarted = (callback: () => void) => {
  // const { whenInitialized } = popEvent(ExpressServer)
  const { whenInitialized } = popEvent(ExpressServer)
  console.log(whenInitialized)
  return whenInitialized(callback)
}

run(
  app({
    portion: [ExpressServer({ port: 3200 })],
    trigger: [whenExpressStarted(() => console.log('Hello from Bara'))],
  }),
)
