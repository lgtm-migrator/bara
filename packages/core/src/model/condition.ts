import { Base } from './base'
import { BaraEventPayload } from './event'

export type BaraConditionConfig<T> = (
  data: BaraEventPayload<T>['payload'],
  eventPayload: BaraEventPayload<T>,
) => boolean | Promise<boolean>

export interface BaraCondition<T> extends Base {
  check: BaraConditionConfig<T>
}
