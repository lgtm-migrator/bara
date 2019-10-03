import { VirtualAction } from './event'

export interface VirtualSeepConfig {
  seepName: string
  conditions: any[]
}

export type VirtualSeep = (...conditions: any[]) => VirtualSeepConfig

export const popSeep = <T>(
  action: VirtualAction<T>,
): { [k: string]: VirtualSeep } => {
  const { seep } = action()
  const virtualSeeps: { [k: string]: VirtualSeep } = {}

  const createSeepFunction = (seepName: string) => (...conditions: any[]) => {
    return { seepName, conditions }
  }

  for (const seepName in seep) {
    if (seepName in seep) {
      virtualSeeps[seepName] = createSeepFunction(seepName)
    }
  }

  return virtualSeeps
}
