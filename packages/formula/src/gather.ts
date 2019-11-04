import { side } from './side'
import { Formula } from './types'

/**
 * Gathering returning value from list of actions into single JS object
 */
export const gatherTo = (props: string[], ...actions: Formula[]) => async (
  payload: any,
  ...rest: any[]
) => {
  const buffer: any[] = await side(...actions)(payload)
  const result: any = {}
  for (let i = 0; i < buffer.length; i += 1) {
    result[props[i] || i] = buffer[i]
  }
  return result
}

export const gatherReduce = (
  initialValue: any,
  props: string[],
  reducer: (accumulator: any, value: any, propName?: string) => any,
  ...actions: Formula[]
) => async (payload: any, ...rest: any[]) => {
  const buffer: any[] = await side(...actions)(payload, ...rest)
  let result: any = initialValue
  for (let i = 0; i < buffer.length; i += 1) {
    result = reducer(result, buffer[i], props[i])
  }
  return result
}
