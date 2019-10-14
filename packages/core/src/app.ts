import { BaraPortionPayload, initPortion } from './portion'
import { BaraTriggerPayload } from './trigger'

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
  trigger?: BaraTriggerPayload[]
}): BaraApplication => {
  const { portion, trigger } = payload

  // Initialize each portion for stream subscription
  const portions = portion.map(p => initPortion(p))
  return { portions, triggers: trigger! }
}
