import { Formula } from '../types'
import { side } from '../utils/side'

/**
 * Gathering returning value from list of actions into single JS object
 * @deprecated This function will be depecated in the stable version 3.0.0
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
  const buffer: any[] = await Promise.resolve(
    side(...actions)(payload, ...rest),
  )
  let result: any = initialValue
  for (let i = 0; i < buffer.length; i += 1) {
    result = reducer(result, buffer[i], props[i])
  }
  return result
}

/**
 * Gather input object into new custom object
 * @param keys Object keys define new object from current payload by keys
 * @example
 * const a = gather({
 *  hello: () => 'world',
 *  year: (a: number, b: number) => a + b,
 * })(2000, 19) // {hello: 'world', year: 2019}
 */
export const gather = (actions: { [k: string]: Formula }) => async (
  payload: any,
  ...rest: any[]
) => {
  const result: any = {}
  for (const key in actions) {
    if (key in actions)
      result[key] = await Promise.resolve(actions[key](payload, ...rest))
  }
  return result
}
