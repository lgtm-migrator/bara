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

export enum TriggerEntityType {
  EVENT = 'EVENT',
  CONDITION = 'CONDITION',
  ACTION = 'ACTION',
}

export type TriggerEntities<T> = UseEventHookType<T>

export type TriggerAttachFunc<T> = (
  type: TriggerEntityType,
  entity: TriggerEntities<T>,
  deps?: any[],
) => void

export interface BaraTrigger<T> extends Base {
  // Metadata
  _config: BaraTriggerConfig<T>

  // Entities
  EVENT?: BaraEvent<T>
  CONDITION?: BaraCondition<T>
  ACTION?: BaraAction<T>

  // Methods
  attach: TriggerAttachFunc<T>
}
