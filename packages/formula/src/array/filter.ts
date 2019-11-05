import { Formula } from '../types'

/**
 * Filter out element that is not qualify with checker.
 * @param checker Any formula return boolean
 */
export const filter = (checker: Formula) => async (
  payload: any[],
  ...rest: any[]
) => {
  const result: any[] = []
  for (const item of payload) {
    const isTruthy = await Promise.resolve(checker(item, ...rest))
    if (isTruthy) {
      result.push(item)
    }
  }
  return result
}

// Prototype
// filter((data: number) => data % 2 === 0)([0, 1, 2, 3, 4]).then(data => {
//   console.log(data)
// })
