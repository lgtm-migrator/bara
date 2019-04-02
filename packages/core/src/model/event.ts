import { Stream } from 'xstream'
import { Base } from './base'
import { BaraStream, BaraStreamPayload } from './stream'

export type BaraEventStream<T> = Stream<BaraStreamPayload<T>>

export interface BaraEvent<T> extends Base {
  _$: BaraEventStream<T>
}

export type EventType = (trigger: Base) => string
