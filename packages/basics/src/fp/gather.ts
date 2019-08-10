import { doWithEach } from './do'
import { DoWithAction, ExtraParam } from './model'

export const gatherTo = (props: string[], ...actions: DoWithAction[]) => async (
  payload: any,
  extras: Set<ExtraParam>,
) => {
  const buffer: any[] = await doWithEach(...actions)(payload, extras)
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
  ...actions: DoWithAction[]
) => async (payload: any, extras: Set<ExtraParam>) => {
  const buffer: any[] = await doWithEach(...actions)(payload, extras)
  let result: any = initialValue
  for (let i = 0; i < buffer.length; i += 1) {
    result = reducer(result, buffer[i], props[i])
  }
  return result
}
