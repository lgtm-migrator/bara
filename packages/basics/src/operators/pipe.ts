import { BaraEventPayload, BaraStreamPayload } from '@bara/core'

import { and } from './and'
import {
  ActionPipeFunction,
  BaraPipeHook,
  ConditionAndFunction,
  ConditionPipe,
  ConditionPipeFunction,
} from './model'

export const createSequencePipe = <T>(
  triggeringEvent: T,
  payload?: BaraEventPayload<T>,
): BaraPipeHook<T> => {
  return (...conditions: Array<ConditionPipe<T>>) => async (
    ...actions: ActionPipeFunction[]
  ) => {
    const flag = await and(...(conditions as any))(triggeringEvent, payload)
    if (flag)
      for (const act of actions) {
        await Promise.resolve(act(triggeringEvent, payload))
      }
    return
  }
}

export const createPipe = createSequencePipe
