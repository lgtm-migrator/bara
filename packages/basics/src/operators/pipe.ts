import { and } from './and'
import {
  ActionPipe,
  BaraPipeHook,
  ConditionAndFunction,
  ConditionPipe,
  ConditionPipeFunction,
  PayloadPipe,
} from './model'

export const createSequencePipe = <T>(
  triggeringEvent: T,
  payload?: PayloadPipe<T>,
): BaraPipeHook<T> => {
  return (...conditions: Array<ConditionPipe<T>>) => async (
    ...actions: Array<ActionPipe<T>>
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
