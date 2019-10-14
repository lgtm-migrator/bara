import { VirtualAction } from './event'

export interface VirtualSeepConfig {
  portionName: string
  flowName: string
  seepName: string
  args?: any
}

export type VirtualSeep = (...conditions: any[]) => VirtualSeepConfig

export const popSeep = <T>(
  action: VirtualAction<T>,
): { [k: string]: VirtualSeep } => {
  const { seep, portionName, flowName } = action() // Only retrieve the seep name on this virtual object
  const virtualSeeps: { [k: string]: VirtualSeep } = {}

  // Carry on which argument is passing to real seep
  const createSeepFunction = (seepName: string) => {
    return (args?: any) => ({ portionName, flowName, seepName, args })
  }

  for (const seepName in seep) {
    if (seepName in seep) {
      virtualSeeps[seepName] = createSeepFunction(seepName)
    }
  }

  return virtualSeeps
}
