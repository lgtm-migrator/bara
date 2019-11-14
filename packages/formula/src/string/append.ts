import { Formula } from '../types'

/**
 * Append a string or a string result of a formula to previous payload
 * @param formula String or formula to be appended.
 */
export const append = (formula: string | Formula) => async (
  payload: string,
  ...rest: any[]
): Promise<string> => {
  if (typeof formula === 'string') {
    return payload + (formula as string)
  }
  const s = await Promise.resolve(formula(payload, ...rest))
  return payload + s
}
