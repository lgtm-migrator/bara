import { Formula } from '../types'

/**
 * Check for specific condition and execute according action.
 * @param ifStm  If condition formula
 * @param thenStm Then statement formula
 * @param elseStm Else statement formula
 */
export const ifElse = (
  ifStm: Formula,
  thenStm: Formula,
  elseStm: Formula,
) => async (payload: any, ...rest: any[]) => {
  if (await Promise.resolve(ifStm(payload, ...rest) || false)) {
    return await Promise.resolve(thenStm(payload, ...rest))
  }
  return await Promise.resolve(elseStm(payload, ...rest))
}
