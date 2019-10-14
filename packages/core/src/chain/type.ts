import { Stream } from 'xstream'
import { BaraLinker } from '../linker'
import { StreamPayload } from '../stream'

export enum ChainType {
  cond = 'cond',
  act = 'act',
  pipe = 'pipe',
}

export interface ChainBase {
  type: ChainType
  func: (payload: StreamPayload) => any
  link: (parentStream: Stream<any>, linker: BaraLinker) => Stream<any>
}

export interface ActChain extends ChainBase {}

export interface CondChain extends ChainBase {}

export interface PipeChain extends ChainBase {
  acts: ActChain
}

export type Chain = ActChain | CondChain | PipeChain
