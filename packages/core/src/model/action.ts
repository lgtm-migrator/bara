import { Listener } from 'xstream'
import { BaraEventPayload } from './event'

export type BaraNormalActionConfig<T> = (
  data: BaraEventPayload<T>['payload'],
  streamPayload: BaraEventPayload<T>,
) => void // TODO implement return cleanup function type in the next major release

export type BaraCallbackActionConfig<T> = (
  streamPayload: BaraEventPayload<T>,
) => void

export interface BaraAction<T> {
  _listener: Listener<BaraEventPayload<T>>
}
