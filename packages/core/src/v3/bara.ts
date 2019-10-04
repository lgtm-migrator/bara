import consola from './consola'

import { BaraContext } from './context'
import { BaraApplication } from './app'
import { BaraTriggerConfig } from './trigger'

export interface BaraRunOptions {
  dev?: boolean
}

/* Run Bara Application */
export const run = (app: BaraApplication, options?: BaraRunOptions) => {
  // There will be one singleton for entire application Context
  const context: BaraContext = {}

  const { portions, triggers } = app
  const all = wire(portions, triggers)

  return { context }
}

/**
 * Wire trigger and portions together to make Bara application works!
 *
 * @param portions Raw portions registered by Bara application.
 * @param triggers Raw triggers data will be map with according stream.
 */
const wire = (portions: any[], triggers: Array<BaraTriggerConfig>) => {
  const globalPortions: { [k: string]: any } = {}

  // Initialize and structure the portions
  for (const portion of portions) {
    if (!(portion.id in globalPortions)) {
      globalPortions[portion.id] = {
        flows: portion.rawFlows,
        triggers: [],
      }
    }
  }
  console.log(`[Wire portions]`, globalPortions)

  // Subscribe trigger with its portions
  for (const trigger of triggers) {
    const { func, rawTrigger } = trigger
    // Apply trigger by seep key
    consola.info(`[Wire trigger]: `, func(rawTrigger.chain), rawTrigger)
  }
}
