import { ActChain, ChainType, CondChain } from './type'

import { BaraLinker } from '../linker'
import { VirtualSeepConfig } from '../seep'
import { StreamPayload } from '../stream'

const getRealSeep = (virtualSeep: VirtualSeepConfig) => (
  payload: StreamPayload,
): boolean => {
  return true
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
      act.func(payload)
    },
    link: (parent, linker: BaraLinker) => {
      const filter = linker.getRealSeep(seep) // TODO make actualSeep the converter belong to the linker
      return parent.filter(filter)
    },
  }
}
