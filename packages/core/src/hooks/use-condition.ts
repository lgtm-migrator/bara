import { BaraCondition, BaraConditionConfig } from '../model/condition'
import { BaraEventPayload } from '../model/event'

export type UseConditionHookType<T> = () => BaraCondition<T>

export const useConditionHook = <T>(
  config: BaraConditionConfig<T>,
): UseConditionHookType<T> => {
  return (): BaraCondition<T> => {
    const condition: BaraCondition<T> = {
      check: (eventPayload: BaraEventPayload<T>): Promise<boolean> => {
        const cond = config(eventPayload.payload, eventPayload)
        return Promise.resolve(cond)
      },
    }
    return condition
  }
}
