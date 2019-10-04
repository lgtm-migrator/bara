import consola from './consola'

import { Chain } from './chain'
import { Stream } from 'xstream'

export interface BaraTriggerPayload {
  flowName: string
  chain: any[]
  seep: any
}

export interface BaraTriggerConfig {
  func: (chain: Chain[]) => void
  rawTrigger: BaraTriggerPayload
}

export const initTrigger = <T>(
  rawTrigger: BaraTriggerPayload,
): BaraTriggerConfig => {
  const func = (chains: Chain[]) => {
    const subscribers: any[] = chains.map(chain => {})
    return subscribers
  }
  return { func, rawTrigger }
}
