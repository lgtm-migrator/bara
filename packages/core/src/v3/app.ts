import { initPortion } from './portion'

export interface BaraApplication {
  portion: any[]
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
  portion: any[]
  /**
   * Trigger is where a bussiness logic will be implement
   */
  trigger?: any[]
}): BaraApplication => {
  const { portion } = payload
  console.log('[Bara App] Started!')

  const portions = portion.map(p => initPortion(p))

  return { portion }
}
