import consola from './consola'

import { initPortion, BaraPortionPayload } from './portion'
import { initTrigger } from './trigger'

export interface BaraApplication {
  portions: any[]
  triggers: any[]
}

export const app = (payload: {
  /**
   * Bara Application Name
   * Can be used as a namespace.
   * This name can be use for wiring/communicating with others.
   */
  name?: string
  /**
   * Basic Bara application building block
   */
  portion: Array<BaraPortionPayload<any, any, any>>
  /**
   * Trigger is where a bussiness logic will be implement
   */
  trigger?: any[]
}): BaraApplication => {
  const { portion, trigger } = payload
  consola.log('[Bara App] Started!')

  // Initialize each portion for stream subscription
  const portions = portion.map(p => initPortion(p))
  consola.info('[Bara App] Portions: ', portions)

  // Subscribe trigger to each portion corresponding stream
  const triggers = (trigger || []).map(t => initTrigger(t))

  return { portions, triggers }
}
