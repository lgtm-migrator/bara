import { Base } from '../model/base'
import { UseEventHookType } from './use-event'

import { slugify } from '../helpers/string'

export interface BaraTriggerConfig<T> extends Base {
  event: UseEventHookType<T>
}

export function useTriggerHook<T>(
  config: BaraTriggerConfig<T>,
  index: number = 0,
) {
  let name = config.name || `trigger-${index}`
  name = slugify(name)
  return { name }
}
