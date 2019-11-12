import { Formula } from '../types'

/**
 * Loop through each element in an array.
 * @param action
 */
export const loopThrough = (action: Formula) => async (
  payload: any,
  ...rest: any[]
): Promise<any[]> => {
  const result: any[] = []
  let index = 0
  for (const element of payload) {
    result.push(await action({ element, index }, ...rest))
    index += 1
  }
  return result
}
