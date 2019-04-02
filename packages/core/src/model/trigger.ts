import { Base } from './base'
import { BaraEvent } from './event'
import { BaraCondition } from './condition'
import { BaraAction } from './action'

export interface BaraTriggerConfig<T> extends Base {
  event: BaraEvent<T>
  condition: BaraCondition<T>
  action: BaraAction<T>
}
