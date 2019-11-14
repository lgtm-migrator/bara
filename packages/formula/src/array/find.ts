import { Formula } from '../types'

/**
 * Find single element based on provided condition.
 * This will emit {element, payload} for other postprocessing.
 * @param formula Checker formula should return a boolean value.
 * @param arrayProp Specify a prop name of an array if the payload is an object.
 */
export const find = (formula: Formula, arrayProp: string = '') => async (
  payload: any | any[],
  ...rest: any[]
) => {
  const array =
    arrayProp !== '' ? (payload as any)[arrayProp] : (payload as any[])
  for (const element of array) {
    const truthy = await Promise.resolve(formula({ element, payload }, ...rest))
    if (truthy === true) {
      return element
    }
  }
  return null
}

// import { eq } from '../condition/compare'
// find(
//   eq(
//     data => {
//       return data.element.one
//     },
//     data => data.element.two,
//   ),
// )([{ one: '2', two: '3' }, { one: '3', two: '3' }]).then(data => {
//   data //?
// })
