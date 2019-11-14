import { Formula } from '../types'

/**
 * Find single element based on provided condition.
 * This will emit {element, payload} for other postprocessing.
 * @param formula
 */
export const find = (formula: Formula, arrayProp: string = '') => (
  payload: any[],
  ...rest: any[]
) => {
  return (arrayProp ? payload[arrayProp] : payload).find((element: any) =>
    formula({ element, payload }, ...rest),
  )
}
