import { Formula } from '../types'

/**
 * Map each element in an array with a formula
 * @param formula Any formula
 */
export const map = (formula: Formula) => async (
  payload: any[],
  ...rest: any[]
) => {
  return await Promise.all(
    payload.map((element: any) => formula(element, ...rest)),
  )
}
