import { Listener } from 'xstream'
import {
  BaraAction,
  BaraCallbackActionConfig,
  BaraNormalActionConfig,
} from '../model/action'
import { BaraCondition } from '../model/condition'
import { BaraEvent, BaraEventPayload } from '../model/event'

export type UseActionHookType<T> = (
  event: BaraEvent<T>,
  condition: BaraCondition<T>,
) => BaraAction<T>

export function useNormalActionHook<T>(
  callback: BaraNormalActionConfig<T>,
): UseActionHookType<T> {
  return (event: BaraEvent<T>, condition: BaraCondition<T>): BaraAction<T> => {
    const _listener: Listener<BaraEventPayload<T>> = {
      next: async (eventPayload: BaraEventPayload<T>) => {
        if (callback) {
          const data = eventPayload.payload
          if (condition && condition.check) {
            try {
              const executable = await condition.check(eventPayload)
              if (!!executable) {
                callback(data, eventPayload)
              }
            } catch (err) {
              return
            }
          }
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
