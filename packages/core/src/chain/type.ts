import { Stream } from 'xstream'
import { BaraLinker } from '../linker'
import { VirtualSeepConfig } from '../seep'
import { StreamPayload } from '../stream'

export enum ChainType {
  cond = 'cond',
  and = 'and',
  or = 'or',
  act = 'act',
  pipe = 'pipe',
}

export interface ChainBase {
  type: ChainType
  func?: (payload: StreamPayload, contextes: any) => any
  link: (parentStream: Stream<any>, linker: BaraLinker) => Stream<any>
}

export interface ActChain extends ChainBase {
  func: (payload: StreamPayload, contextes: any) => any
  seeps?: VirtualSeepConfig[] // TODO need fixed typing here with CondChain
}

export interface CondChain extends ChainBase {
  func: (payload: StreamPayload, contextes: any) => any
  seeps?: VirtualSeepConfig[]
}

export interface AndChain extends ChainBase {
  seeps: VirtualSeepConfig[]
}
export interface OrChain extends ChainBase {
  seeps: VirtualSeepConfig[]
}

export type CompareChain = AndChain | OrChain

export function isChain(obj: VirtualSeepConfig | ChainBase): boolean {
  return (obj as ChainBase).type !== undefined
}
