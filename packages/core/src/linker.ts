import { VirtualSeepConfig } from './seep'
import { StreamPayload } from './stream'

export interface BaraLinker {
  getRealAction: (...args: any[]) => (payload: StreamPayload) => void
  getRealSeep: (seep: VirtualSeepConfig) => (payload: StreamPayload) => boolean
}
