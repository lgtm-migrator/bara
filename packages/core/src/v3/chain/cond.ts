import { Chain, ChainType } from './type'

import { ActChain } from './act'
import { StreamPayload } from '../stream'
import { VirtualSeepConfig } from '../seep'

export interface CondChain extends Chain {
  act: ActChain
}

/**
 * `cond` will be map as a filter stream from the base Flow's stream,
 * resulted in new sub stream of condition.
 *
 * @param condition Evaluate the condition before executing an action
 * @param chain Which action will be executed when condition is pass
 */
export const cond = (seep: VirtualSeepConfig, act: ActChain): CondChain => {
  return {
    type: ChainType.cond,
    func: (payload: StreamPayload) => {
      return { ...seep, payload }
    },
    act,
  }
}
