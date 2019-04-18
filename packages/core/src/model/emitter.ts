import { Stream } from 'xstream'

import { Base } from './base'
import { EventType } from './event'
import { BaraStreamPayload } from './stream'

export type BaraEmitterSetup<T> = (params: BaraEmitterParams<T>) => void

export interface BaraEmitterParams<T> {
  setName: (name: string) => void
  addEventType: (eventType: EventType) => void
}

export interface BaraEmitterPayload<T> extends BaraStreamPayload<T> {}

export interface BaraEmitterConfig<T> {
  name: string
  eventTypes: EventType[]
}

export interface BaraEmitter<T> extends Base {
  _$: Stream<BaraEmitterPayload<T>>
}
