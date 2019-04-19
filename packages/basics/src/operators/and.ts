import { BaraEventPayload, BaraStreamPayload } from '@bara/core'

import { ConditionPipe } from './model'
import { checkConditionPipe } from './pipe-checker'

export const and = <T>(...conditions: Array<ConditionPipe<T>>) => {
  return async (
    triggeringEvent: T,
    payload?: BaraEventPayload<T> | BaraStreamPayload<T>,
  ) => {
    const table = await checkConditionPipe<T>(
      conditions,
      triggeringEvent,
      payload,
    )
    return table.reduce((flag, is) => flag && is, true)
  }
}
