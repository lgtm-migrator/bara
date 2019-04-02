import { BaraTriggerConfig } from './model/trigger'
import { slugify } from './helpers/string'

/**
 * Create event type with safe name, prevent bad character and duplicate event type across different streams
 * This will be invoked at runtime by its trigger
 */
export function createEventType<T>(eventType: string) {
  return (trigger: BaraTriggerConfig<T>) => {
    return slugify(`${trigger.name}___${eventType}`)
  }
}
