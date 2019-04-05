import { Stream } from 'xstream'

import { Base } from './base'
import { EventType } from './event'

export interface BaraStreamPayload<T> {
  eventType: EventType
  payload: T
}

export interface BaraStreamConfig<T> {
  name?: string
  eventTypes: EventType[]
  setup: (callback: SetupCallbacks<T>) => void
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
