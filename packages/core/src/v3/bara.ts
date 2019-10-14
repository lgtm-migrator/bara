import consola from './consola'

import { BaraApplication } from './app'
import { BaraContext } from './context'
import { initTrigger, BaraTriggerPayload } from './trigger'
import { BaraLinker } from './linker'
import { ChainBase } from './chain'
import { VirtualSeepConfig } from './seep'
import { StreamPayload } from './stream'
import { BaraPortionPayload } from './portion'

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
const wire = (portions: any[], triggers: BaraTriggerPayload[]) => {
  const globalPortions: { [k: string]: any } = {}

  // Initialize and structure the portions
  for (const portion of portions) {
    if (!(portion.id in globalPortions)) {
      globalPortions[portion.name] = {
        id: portion.id,
        flows: portion.rawFlows,
      }
    }
  }
  console.log(`[Wire portions]`, globalPortions)

  const linker: BaraLinker = {
    getRealAction: (act: ChainBase) => (payload: StreamPayload) => {},
    getRealSeep: (seep: VirtualSeepConfig) => {
      const { seepName, portionName } = seep
      let realSeep = (...args: any[]) => {
        consola.warn(
          `The seep ${seepName} is not correctly destructed from Portion, will return true any data through the portion ${portionName}`,
        )
        return true
      }

      if (portionName in globalPortions) {
        const currentPortion: BaraPortionPayload<any, any, any> =
          globalPortions[portionName as string]
        for (const flowName in currentPortion.rawFlows) {
          const currentFlow = currentPortion.rawFlows[flowName]
          console.log(`currentFlow: ${currentFlow}`)
        }
      }

      return (payload: StreamPayload) => {
        return realSeep(payload)
      }
    },
  }

  // Subscribe trigger to each portion corresponding stream
  // Trigger will be registering when this application is going run
  const rawTriggers = (triggers || []).map(t => initTrigger(t, linker))
  consola.info('[Bara App] Raw Trigger: ', rawTriggers)

  // Subscribe trigger with its portions
  for (const trigger of rawTriggers) {
    const { rawTrigger, func } = trigger
    const { flowName, portionName, chain } = rawTrigger
    const belongPortion = globalPortions[portionName]
    consola.info(
      `[Wiring trigger]:`,
      rawTrigger,
      'with portion:',
      belongPortion,
    )

    if (flowName in belongPortion.flows) {
      const upstream = belongPortion.flows[flowName].subStream
      let triggerSubscribers = func(chain, upstream)
      consola.info(`[Bara triggerSubscribers]: `, triggerSubscribers)
      for (const { stream, action } of triggerSubscribers) {
        stream.addListener({ next: action })
      }
    }
  }
}
