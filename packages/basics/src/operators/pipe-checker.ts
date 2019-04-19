import { BaraEventPayload, BaraStreamPayload } from '@bara/core'

import {
  ConditionAndFunction,
  ConditionPipe,
  ConditionPipeFunction,
} from './model'

export async function checkConditionPipe<T>(
  conditions: Array<ConditionPipe<T>>,
  triggeringEvent: T,
  payload?: BaraEventPayload<T> | BaraStreamPayload<T>,
): Promise<boolean[]> {
  let array: boolean[] = []
  for (const cond of conditions) {
    let canNext = false
    try {
      const condFunc = cond as ConditionPipeFunction<T>
      canNext = await Promise.resolve(condFunc(
        triggeringEvent,
        payload,
      ) as boolean)
    } catch (err) {
      canNext = false
    }
    array = [...array, canNext]
  }
  return array
}
