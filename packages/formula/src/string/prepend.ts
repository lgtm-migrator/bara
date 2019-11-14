import { Formula } from '../types'

/**
 * Append a string or a string result of a formula to previous payload
 * @param formula String or formula to be prepended.
 */
export const prepend = (formula: string | Formula) => async (
  payload: string,
  ...rest: any[]
): Promise<string> => {
  if (typeof formula === 'string') {
    return (formula as string) + payload
  }
  const s = await Promise.resolve(formula(payload, ...rest))
  return s + payload
}
