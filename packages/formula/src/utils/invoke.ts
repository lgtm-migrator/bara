import { lensProp } from '../object'
import { Formula } from '../types'

export const invoke = (key: string, formula: Formula) => async (
  payload: any,
  invoker: any,
  ...rest: any[]
) => {
  const func = lensProp(key)(invoker)
  const params = await formula(payload, ...rest)
  return await Promise.resolve(func(params))
}
