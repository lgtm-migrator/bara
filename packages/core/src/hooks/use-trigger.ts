import { AppStream } from '../model/app'
import { Base } from '../model/base'
import { BaraEvent } from '../model/event'
import {
  BaraTrigger,
  BaraTriggerConfig,
  TriggerAttachFunc,
  TriggerEntityType,
} from '../model/trigger'

import { generateName } from '../helpers/string'

const generateTriggerName = (triggerName: string, context: number) =>
  generateName(
    'TRIGGER',
    ctx => {
      return triggerName ? triggerName : ctx
    },
    context,
  )

export function useTriggerHook<T>(
  _config: BaraTriggerConfig<T>,
  index: number = 0,
): BaraTrigger<T> {
  const attach: TriggerAttachFunc<T> = (entityType, entity, deps) => {
    // Only attach an Entity when its not yet attached
    if (trigger && !trigger[entityType]) {
      // Attach Event
      if (entityType === TriggerEntityType.EVENT) {
        let appStream: AppStream<T>
        if (deps && deps.length > 0) {
          appStream = deps[0] as AppStream<T>
          const event: BaraEvent<T> = entity(appStream)
          if (event && event._$ && event.name) {
            trigger[entityType] = event
          } else {
            throw new Error(
              ` [BaraTrigger] Could not detect event before attaching to trigger ${
                trigger.name
              } `,
            )
          }
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

  const name = generateTriggerName(_config.name as string, index)
  const trigger: BaraTrigger<T> = { _config, name, attach }
  return trigger
}
