import { BaraLinker } from '../linker'
import { VirtualSeepConfig } from '../seep'
import { StreamPayload } from '../stream'
import { AndChain, ChainType, CompareChain, isChain, OrChain } from './type'

export const switchCompareParser = (
  chain: AndChain | OrChain,
  linker: BaraLinker,
) => {
  switch (chain.type) {
    case ChainType.and:
      return andParser(chain.seeps, linker)
    case ChainType.or:
      return orParser(chain.seeps, linker)
  }
  return () => false
}

export const andParser = (
  seeps: Array<VirtualSeepConfig | AndChain | OrChain>,
  linker: BaraLinker,
) => (payload: StreamPayload): boolean => {
  let flag = true
  for (const seep of seeps) {
    if (isChain(seep)) {
      flag = flag && switchCompareParser(seep as CompareChain, linker)(payload)
    } else {
      const realSeep = linker.getRealSeep(seep as VirtualSeepConfig)
      flag = flag && realSeep(payload)
    }
  }
  return flag
}

export const orParser = (
  seeps: Array<VirtualSeepConfig | AndChain | OrChain>,
  linker: BaraLinker,
) => (payload: StreamPayload): boolean => {
  let flag = false
  for (const seep of seeps) {
    if (isChain(seep)) {
      flag = flag || switchCompareParser(seep as CompareChain, linker)(payload)
    } else {
      const realSeep = linker.getRealSeep(seep as VirtualSeepConfig)
      flag = flag || realSeep(payload)
    }
  }
  return flag
}
