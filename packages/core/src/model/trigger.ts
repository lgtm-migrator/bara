import { BaraAction } from './action'
import { Base } from './base'
import { BaraCondition } from './condition'
import { BaraEvent } from './event'

export interface BaraTrigger<T> extends Base {
  event: BaraEvent<T>
  condition: BaraCondition<T>
  action: BaraAction<T>
}
