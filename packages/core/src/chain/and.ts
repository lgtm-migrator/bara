import { AndChain, ChainType, CondChain, isChain } from './type'

import { BaraLinker } from '../linker'
import { VirtualSeepConfig } from '../seep'
import { StreamPayload } from '../stream'

const realSeepParser = (
  seeps: Array<VirtualSeepConfig | AndChain>,
  linker: BaraLinker,
) => {
  const realSeeps: any = []
  for (const seep of seeps) {
    if (isChain(seep)) {
      const chain: CondChain = seep as CondChain
      realSeeps.push(realSeepParser(chain.seeps, linker))
    } else {
      const realSeep = linker.getRealSeep(seep as VirtualSeepConfig)
      realSeeps.push(realSeep)
    }
  }
  return realSeeps
}

const andParser = (realSeeps: Array<(data: StreamPayload) => boolean>) => (
  data: StreamPayload,
): boolean => {
  let flag = true
  for (const rs of realSeeps) {
    if (typeof rs === 'function') {
      flag = flag && rs(data)
    } else {
      flag = flag && andParser(rs)(data)
    }
  }
  return flag
}

/**
 * `cond` will be map as a filter stream from the base Flow's stream,
 * resulted in new sub stream of condition.
 *
 * @param condition Evaluate the condition before executing an action
 * @param chain Which action will be executed when condition is pass
 */
export const and = (
  ...seeps: Array<VirtualSeepConfig | AndChain>
): AndChain => ({
  type: ChainType.and,
  seeps: seeps as VirtualSeepConfig[],
  link: (parent, linker: BaraLinker) => {
    const realSeeps = realSeepParser(seeps, linker)
    return parent.filter((data: StreamPayload) => andParser(realSeeps)(data))
  },
})
