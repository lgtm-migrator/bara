import { Stream } from 'xstream'

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
  addEventType: (eventType: EventType) => void
  addEventTypes: (eventTypes: EventType[]) => void
}

export type BaraStreamCleanup = () => void

export type BaraStreamSetup<T> = (
  params: BaraStreamParams<T>,
) => BaraStreamCleanup | void

export interface BaraStreamConfig<T> {
  name: string
  eventTypes: EventType[]
}

export interface BaraStream<T> extends Base {
  _$: Stream<BaraStreamPayload<T>>
  config: BaraStreamConfig<T>
}

export interface SetupCallbacks<T> {
  emit: (eventType: EventType, payload: T) => void
  emitCallback?: (
    eventType: EventType,
    payload: T,
    callback: (...args: any) => void,
  ) => void
  error?: (errorMessage: string) => void
  done?: () => void
  options?: any
}
