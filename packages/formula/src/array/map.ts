import { Formula } from '../types'

type F = () => any

/**
 * Map each element in an array with a formula
 * @param formula Any formula
 */
export const map = (formula: Formula) => async (
  payloadOrFunc: any[] | F,
  ...rest: any[]
) => {
  if (typeof payloadOrFunc === 'function') {
    return (rest[0] as any[]).map((element: any) => () =>
      formula(element, payloadOrFunc, ...rest),
    )
  }
  return payloadOrFunc.map((element: any) => formula(element, ...rest))
}
