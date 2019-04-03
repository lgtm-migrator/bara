import { Stream } from 'xstream'
import { Base } from './base'
import { BaraStream, BaraStreamPayload } from './stream'

export interface BaraEventPayload<T> {
  eventType: string
  payload: T
}

export type BaraEventStream<T> = Stream<BaraEventPayload<T>>

export interface BaraEvent<T> extends Base {
  _$: BaraEventStream<T>
}

export type EventType = (trigger: Base) => string
