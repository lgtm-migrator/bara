import { Formula } from '../types'

/**
 * Some formula consume the parameters into a single array return.
 * You can use this formula to parse that array into a formula.
 * @param formula
 */
export const bindArgs = (formula: Formula) => (payload: any[]) => {
  return formula(...payload)
}
