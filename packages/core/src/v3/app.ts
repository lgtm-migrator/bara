import consola from './consola'

import { ChainBase } from './chain'
import { BaraLinker } from './linker'
import { BaraPortion, BaraPortionPayload, initPortion } from './portion'
import { VirtualSeepConfig } from './seep'
import { StreamPayload } from './stream'
import { BaraTriggerPayload, initTrigger } from './trigger'

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
  consola.info('[Bara App] Portions: ', portions)
  return { portions, triggers: trigger! }
}

const findPortion = (
  portionName: string,
  portions: Array<BaraPortion<any, any, any>>,
) => {}
