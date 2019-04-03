import { Listener } from 'xstream'
import {
  BaraAction,
  BaraCallbackActionConfig,
  BaraNormalActionConfig,
} from '../model/action'
import { BaraEvent, BaraEventPayload } from '../model/event'

export type UseActionHookType<T> = (event: BaraEvent<T>) => BaraAction<T>

export function useNormalActionHook<T>(
  callback: BaraNormalActionConfig<T>,
): UseActionHookType<T> {
  return (event: BaraEvent<T>): BaraAction<T> => {
    const _listener: Listener<BaraEventPayload<T>> = {
      next: (streamPayload: BaraEventPayload<T>) => {
        if (callback) {
          const data = streamPayload.payload
          callback(data, streamPayload)
        }
      },
      error: () => {
        return
      }, // TODO handle stream error
      complete: () => {
        return
      }, // TODO handle stream complete
    }

    // Subscribe to event source
    if (event && event._$) {
      event._$.addListener(_listener)
    }
    return { _listener }
  }
}

export function useCallbackActionHook<T>(config: BaraCallbackActionConfig<T>) {
  return true
}
