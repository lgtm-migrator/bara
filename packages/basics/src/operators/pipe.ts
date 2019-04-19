import { BaraEventPayload, BaraStreamPayload } from '@bara/core'

export type ConditionPipeFunction<T> = (
  triggeringEvent: T,
  payload?: BaraEventPayload<T> | BaraStreamPayload<T>,
) => Promise<boolean> | boolean

export type ActionPipeFunction = (
  ...args: any[]
) => Promise<any> | any | undefined | void

export type BaraPipeHook<T> = (
  ...conditions: Array<ConditionPipeFunction<T>>
) => (...actions: ActionPipeFunction[]) => Promise<void>

async function checkConditionPipe<T>(
  conditions: Array<ConditionPipeFunction<T>>,
  triggeringEvent: T,
  payload?: BaraEventPayload<T> | BaraStreamPayload<T>,
) {
  return conditions.reduce(async (acc, cond) => {
    let canNext = false
    try {
      canNext = await Promise.resolve(cond(triggeringEvent, payload) as boolean)
    } catch (err) {
      canNext = false
    }
    return acc && canNext
  }, Promise.resolve(true))
}

export const createSequencePipe = <T>(
  triggeringEvent: T,
  payload?: BaraEventPayload<T>,
): BaraPipeHook<T> => {
  return (...conditions: Array<ConditionPipeFunction<T>>) => async (
    ...actions: ActionPipeFunction[]
  ) => {
    const flag = await checkConditionPipe(conditions, triggeringEvent, payload)
    if (flag === true)
      for (const act of actions) {
        await Promise.resolve(act(triggeringEvent, payload))
      }
    return
  }
}
