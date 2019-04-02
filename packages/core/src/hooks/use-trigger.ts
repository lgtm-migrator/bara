import { Base } from '../model/base'
import { BaraTrigger, BaraTriggerConfig } from '../model/trigger'

import { slugify } from '../helpers/string'

export function useTriggerHook<T>(
  config: BaraTriggerConfig<T>,
  index: number = 0,
) {
  let name = config.name || `trigger-${index}`
  name = slugify(name)
  return { name, config }
}
