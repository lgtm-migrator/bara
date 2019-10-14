import consola from './consola'

import { initPortion, BaraPortionPayload, BaraPortion } from './portion'
import { initTrigger, BaraTriggerPayload } from './trigger'
import { BaraLinker } from './linker'
import { ChainBase } from './chain'
import { VirtualSeepConfig } from './seep'
import { StreamPayload } from './stream'

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
  trigger?: Array<BaraTriggerPayload>
}): BaraApplication => {
  const { portion, trigger } = payload

  // Initialize each portion for stream subscription
  const portions = portion.map(p => initPortion(p))
  consola.info('[Bara App] Portions: ', portions)
  return { portions, triggers: trigger! }
}

const findPortion = (
  portionName: string,
  portions: Array<BaraPortion<any, any, any>>,
) => {}
