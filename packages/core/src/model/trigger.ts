import { BaraAction } from './action'
import { AppStream } from './app'
import { Base } from './base'
import { BaraCondition } from './condition'
import { BaraEvent } from './event'

import { UseEventHookType } from '../hooks/use-event'

export type BaraTriggerSetup<T> = (
  ...args: any[]
) => [(appStream: AppStream<T>) => BaraEvent<T>]

export interface BaraTriggerConfig<T> extends Base {
  event: UseEventHookType<T> | null
}

export interface BaraTrigger<T> extends Base {
  event: BaraEvent<T>
  condition: BaraCondition<T>
  action: BaraAction<T>
}
