import { MemoryStream, Stream } from 'xstream'

import { Base } from './base'
import { EventType } from './event'

export interface BaraStreamPayload<T> {
  eventType: string
  payload: T | null
  streamName: string
}

export interface BaraStreamParams<T> {
  emit: (eventType: EventType, value?: T) => void
  setName: (name: string) => void
  setMemory: (memorable: boolean) => void
  // listen: (emitter: any) => void
  // addCallback: (callback: (...args: any[]) => void) => void
  addEventType: (eventType: EventType) => void
  addEventTypes: (eventTypes: EventType[]) => void
}

export type BaraStreamCleanup = () => void

export type BaraStreamSetup<T> = (
  params: BaraStreamParams<T>,
) => BaraStreamCleanup | void

export interface BaraStreamConfig<T> {
  name: string
  memory: boolean
  eventTypes: EventType[]
}

export interface BaraStream<T> extends Base {
  _$: Stream<BaraStreamPayload<T>> | MemoryStream<BaraStreamPayload<T>>
  config: BaraStreamConfig<T>
}
