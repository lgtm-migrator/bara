import { StreamPayload } from './stream'
import { VirtualSeepConfig } from './seep'

export interface BaraLinker {
  getRealAction: (...args: any[]) => (payload: StreamPayload) => void
  getRealSeep: (seep: VirtualSeepConfig) => (payload: StreamPayload) => boolean
}
