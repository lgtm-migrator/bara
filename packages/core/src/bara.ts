import { BaraApplication } from './app'
import { BaraContext } from './context'
import { BaraLinker, buildLinker } from './linker'
import { BaraTriggerPayload, initTrigger } from './trigger'

export interface BaraRunOptions {
  dev?: boolean
}

/* Run Bara Application */
export const run = (app: BaraApplication, options?: BaraRunOptions) => {
  // There will be one singleton for entire application Context
  const context: BaraContext = {}

  const { portions, triggers } = app

  const all = wire(portions, triggers)

  return { context, all }
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

  const linker: BaraLinker = buildLinker(globalPortions)

  // Trigger will be registering when this application is bootstraped
  const rawTriggers = (triggers || []).map(t => initTrigger(t, linker))

  // Subscribe trigger with its portions
  // This piece of codes could be implement in the `run` function
  for (const trigger of rawTriggers) {
    const { rawTrigger, func } = trigger
    const { flowName, portionName, chain } = rawTrigger
    const belongPortion = globalPortions[portionName]

    if (flowName in belongPortion.flows) {
      const upstream = belongPortion.flows[flowName].subStream
      const triggerSubscribers = func(chain, upstream)
      for (const { stream, action } of triggerSubscribers) {
        stream.addListener({ next: action })
      }
    }
  }

  return globalPortions
}
