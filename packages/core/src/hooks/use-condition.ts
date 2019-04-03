import { BaraCondition, BaraConditionConfig } from '../model/condition'
import { BaraEventPayload } from '../model/event'

export type UseBaraConditionHook<T> = () => BaraCondition<T>

export const useConditionHook = <T>(
  config: BaraConditionConfig<T>,
): UseBaraCondition<T> => {
  return (): BaraCondition<T> => {
    const condition: BaraCondtion<T> = {
      check: (eventPayload: BaraEventPayload<T>): boolean => {
        return config(eventPayload)
      },
    }
    return condition
  }
}
