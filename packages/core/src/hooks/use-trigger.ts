import { AppStream } from '../model/app'
import { Base } from '../model/base'
import { BaraCondition } from '../model/condition'
import { BaraEvent } from '../model/event'
import {
  BaraTrigger,
  BaraTriggerConfig,
  TriggerAttachFunc,
  TriggerEntityType,
} from '../model/trigger'

import { UseActionHookType } from './use-action'
import { UseConditionHookType } from './use-condition'
import { UseEventHookType } from './use-event'

import { getBaraName } from '../helpers/string'

export function useTriggerHook<T>(
  _config: BaraTriggerConfig<T>,
  index: number = 0,
): BaraTrigger<T> {
  const attach: TriggerAttachFunc<T> = (entityType, entity, deps) => {
    // Only attach an Entity when its not yet attached
    if (trigger && !trigger[entityType]) {
      // Attach Event
      if (entity && entityType === TriggerEntityType.EVENT) {
        let appStream: AppStream<T>
        if (deps && deps.length > 0) {
          appStream = deps[0] as AppStream<T>
          const event: BaraEvent<T> = (entity as UseEventHookType<T>)(appStream)
          if (!(event && event._$ && event.name)) {
            throw new Error(
              ` [BaraTrigger] Could not detect event before attaching to trigger ${
                trigger.name
              } `,
            )
          }
          trigger[entityType] = event
          return event
        }
      }

      // Attach Condition
      if (entity && entityType === TriggerEntityType.CONDITION) {
        const condition = (entity as UseConditionHookType<T>)()
        return condition
      }

      // Attach Action
      if (entity && entityType === TriggerEntityType.ACTION) {
        if (deps && deps.length > 0) {
          const event = deps[0] as BaraEvent<T>
          const condition = deps[1] as BaraCondition<T>
          const action = (entity as UseActionHookType<T>)(event, condition)
        }
      }
    } else {
      throw new Error(
        `[BaraTrigger] Could not attach multiple ${entityType} to trigger ${
          trigger.name
        }`,
      )
    }
  }

  const name = getBaraName((_config.name as string) || `trigger-${index}`)
  const trigger: BaraTrigger<T> = { _config, name, attach }
  return trigger
}
