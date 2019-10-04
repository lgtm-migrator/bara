import { VirtualAction } from './event'

export interface VirtualSeepConfig {
  seepName: string
  args?: any
}

export type VirtualSeep = (...conditions: any[]) => VirtualSeepConfig

export const popSeep = <T>(
  action: VirtualAction<T>,
): { [k: string]: VirtualSeep } => {
  const { seep } = action() // Only retrieve the seep name on this virtual object
  const virtualSeeps: { [k: string]: VirtualSeep } = {}

  // Carry on which argument is passing to real seep
  const createSeepFunction = (seepName: string) => {
    return (args?: any) => ({ seepName, args })
  }

  for (const seepName in seep) {
    if (seepName in seep) {
      virtualSeeps[seepName] = createSeepFunction(seepName)
    }
  }

  return virtualSeeps
}
