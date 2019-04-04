import { BaraEventPayload } from './event'

export type BaraConditionConfig<T> = (
  data?: BaraEventPayload<T>['payload'],
  eventPayload?: BaraEventPayload<T>,
) => boolean | Promise<boolean>

export type BaraConditionCheck<T> = (
  eventPayload: BaraEventPayload<T>,
) => Promise<boolean>

export interface BaraCondition<T> {
  check: BaraConditionCheck<T>
}
