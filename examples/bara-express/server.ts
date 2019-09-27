import { run, app } from '@bara/core'
import { ExpressPortion } from '.'

const { whenInitialized: whenExpressStarted } = ExpressPortion()

run(
  app({
    portion: [ExpressPortion({ port: 3200 })],
    trigger: [() => console.log('Hello from Bara')],
  }),
)
