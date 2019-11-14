import { Formula } from '../types'

/**
 * Find single element based on provided condition.
 * This will emit {element, payload} for other postprocessing.
 * @param formula
 */
export const find = (formula: Formula, arrayProp: string = '') => (
  payload: any | any[],
  ...rest: any[]
) => {
  return (arrayProp !== ''
    ? (payload as any)[arrayProp]
    : (payload as any[])
  ).find((element: any) => formula({ element, payload }, ...rest))
}
