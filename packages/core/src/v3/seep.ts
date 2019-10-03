import { VirtualAction } from './event'

export type VirtualSeep = (...conditions: any[]) => boolean

export const popSeep = (
  action: VirtualAction,
): { [k: string]: VirtualSeep } => {
  const createSeepFunction = (seepName: string) => {}

  for (const seep in action) {
  }

  return {}
}
