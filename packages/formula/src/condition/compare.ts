import { Formula } from '../types'

export const eq = (...formulas: Formula[]) => async (
  payload: any,
  ...rest: any[]
) => {
  let flag = true
  for (const formula of formulas) {
    flag = flag && (await Promise.resolve(formula(payload, ...rest)))
  }
  return flag
}

export const neq = (...formulas: Formula[]) => async (
  payload: any,
  ...rest: any[]
) => {
  let flag = false
  for (const formula of formulas) {
    flag = flag || (await Promise.resolve(formula(payload, ...rest)))
  }
  return flag
}
