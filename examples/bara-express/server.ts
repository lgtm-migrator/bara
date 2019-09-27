import { run, app, popEvent } from '@bara/core/src'
import { ExpressServer } from '.'

const printExpress = (callback: () => void) => {
  const { whenInitialized: whenExpressStarted } = popEvent(ExpressServer)
  return whenExpressStarted(callback)
}

run(
  app({
    portion: [ExpressServer({ port: 3200 })],
    trigger: [printExpress(() => console.log('Hello from Bara'))],
  }),
)
