import { Formula } from '../types'

/**
 * Find single element based on provided condition.
 * This will emit {element, payload} for other postprocessing.
 * @param formula Checker formula should return a boolean value.
 * @param arrayProp Specify a prop name of an array if the payload is an object.
 */
export const find = (formula: Formula, arrayProp: string = '') => (
  payload: any | any[],
  ...rest: any[]
) => {
  return (arrayProp !== ''
    ? (payload as any)[arrayProp]
    : (payload as any[])
  ).find((element: any) =>
    Promise.resolve(formula({ element, payload }, ...rest)),
  )
}
