import { andParser } from './compare'
import { ChainType, CompareChain, OrChain } from './type'

import { BaraLinker } from '../linker'
import { VirtualSeepConfig } from '../seep'
import { StreamPayload } from '../stream'

/**
 * Compare all the seeps and make sure all of it is truthy value when return
 */
export const or = (
  ...seeps: Array<VirtualSeepConfig | CompareChain>
): OrChain => ({
  type: ChainType.or,
  seeps: seeps as VirtualSeepConfig[],
  link: (parent, linker: BaraLinker) =>
    parent.filter((data: StreamPayload) => andParser(seeps, linker)(data)),
})
