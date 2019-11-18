import { Formula } from '../types'

/**
 * Select nth arg from previous payload.
 * @param argNo nth arg
 * @param formula Formula will receive value of argNo.
 */
export const selectArg = (argNo: number, formula: Formula) => async (
  ...args: any[]
) => {
  return await Promise.resolve(formula(args[argNo]))
}
