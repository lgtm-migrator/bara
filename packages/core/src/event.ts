import { slugify } from './helpers/string'
import { Base } from './model/base'
import { EventType } from './model/event'

/**
 * Create event type with safe name, prevent bad character and duplicate event type across different streams
 * This will be invoked at runtime by its trigger
 */
export function createEventType<T>(eventType: string): EventType {
  return (trigger: Base) => slugify(`${trigger.name}___${eventType}`)
}
