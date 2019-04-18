import { Stream } from 'xstream'

import { Base } from './base'
import { EventType } from './event'
import { BaraStreamPayload } from './stream'

export type BaraEmitterSetup<T> = (params: BaraEmitterParams<T>) => void

export type BaraEmitterFunc = (payload?: any) => void

export interface BaraEmitterParams<T> {
  setName: (name: string) => void
  addEventType: (eventType: EventType) => void
}

export interface BaraEmitterPayload<T> extends BaraStreamPayload<T> {}

export interface BaraEmitterConfig<T> {
  name: string
  eventTypes: EventType[]
}

export interface BaraEmitterFuncRecord {
  0: string
  1: BaraEmitterFunc
}

export interface BaraEmitter<T> extends Base {
  _$: Stream<BaraEmitterPayload<T>>
  emitFuncs: BaraEmitterFuncRecord[]
  addListener: (
    eventType: EventType,
    callback: (...args: any[]) => void,
  ) => void
}

export interface BaraEmitterMap {
  [key: string]: (...args: any[]) => void
}
