import { Formula } from '../types'

/**
 * Move specific arguments index into the first arg.
 * @param index Args index
 * @param action Any formula
 */
export const swapArg = (index: number, action: Formula) => (
  ...params: any[]
) => {
  const select = params[index]
  const newParams = params.filter((_: any, i: number) => i !== index) // ?
  return action(select[0], ...newParams)
}

// console.log(
// [ 'b', 'a', 'c']
//   swapArg(1, (...data: any[]) => data)('a', 'b', 'c'),
// )
