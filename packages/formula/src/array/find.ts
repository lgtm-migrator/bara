import { Formula } from '../types'

/**
 * Find single element based on provided condition
 * @param formula
 */
export const find = (formula: Formula) => (payload: any[], ...rest: any[]) => {
  return payload.find((element: any) => formula(element, ...rest))
}
