import consola from './consola'

import { Stream } from 'xstream'
import { Chain, ChainType } from './chain'

export interface BaraTriggerPayload {
  flowName: string
  chain: any[]
  seep: any
}

export interface BaraTriggerConfig {
  func: (chain: Chain[]) => void
  rawTrigger: BaraTriggerPayload
}

export const initTrigger = (
  rawTrigger: BaraTriggerPayload,
): BaraTriggerConfig => {
  const func = (chains: Chain[]) => {
    const subscribers: any[] = chains.map(chain => {
      // Create sub stream for trigger action here
      console.log(chain)
      if (chain.type === ChainType.cond) {
        // Create filter stream
      } else if (chain.type === ChainType.act) {
        // Create direct action stream
      }
      return chain
    })
    return subscribers
  }
  return { func, rawTrigger }
}
