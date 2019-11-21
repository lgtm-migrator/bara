import { ChainBase } from './chain'
import consola from './consola'
import { VirtualSeepConfig } from './seep'
import { StreamPayload } from './stream'

export interface BaraLinker {
  getRealAction: (...args: any[]) => (payload: StreamPayload) => void
  getRealSeep: (seep: VirtualSeepConfig) => (payload: StreamPayload) => boolean
}

export const buildLinker = (globalPortions: any) => {
  const linker: BaraLinker = {
    getRealAction: (act: ChainBase) => (payload: StreamPayload) => ({
      act,
      payload,
    }),
    getRealSeep: (seep: VirtualSeepConfig) => {
      const { portionName, flowName, seepName, args } = seep
      let realSeep = (...params: any[]) => (_: StreamPayload, __: any) => {
        consola.warn(
          `The seep ${seepName} is not correctly destructed from portion: ${portionName}, Bara will making it always return "true".`,
        )
        return true
      }

      // Replace default seep with the real configured seep
      if (portionName in globalPortions) {
        realSeep = globalPortions[portionName].flows[flowName].seep[seepName]
      }

      return (payload: StreamPayload) => {
        return realSeep(args)(payload, globalPortions)
      }
    },
  }
  return linker
}
