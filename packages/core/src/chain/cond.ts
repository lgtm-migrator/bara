import { ActChain, AndChain, ChainType, CondChain, isChain } from './type'

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
export const cond = (
  seepOrChain: VirtualSeepConfig | AndChain,
  act: ActChain,
): CondChain => {
  return {
    type: ChainType.cond,
    func: (payload: StreamPayload) => {
      act.func(payload)
    },
    link: (parent, linker: BaraLinker) => {
      const filter = isChain(seepOrChain)
        ? (seepOrChain as CondChain).link(parent, linker)
        : parent.filter(linker.getRealSeep(seepOrChain as VirtualSeepConfig))
      return filter
    },
    seeps: [seepOrChain as VirtualSeepConfig],
  }
}
