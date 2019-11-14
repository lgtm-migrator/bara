import { Formula } from '../types'

export const eq = (...formulas: Formula[]) => async (
  payload: any,
  ...rest: any[]
) => {
  return formulas.reduce(async (acc: any, formula: any) => {
    if (acc === null) {
      return await Promise.resolve(formula(payload, ...rest))
    }
    return acc === (await Promise.resolve(formula(payload, ...rest)))
  }, Promise.resolve(null))
}

export const neq = (...formulas: Formula[]) => async (
  payload: any,
  ...rest: any[]
) => {
  return formulas.reduce(async (acc: any, formula: any) => {
    if (acc === null) {
      return await Promise.resolve(formula(payload, ...rest))
    }
    return acc !== (await Promise.resolve(formula(payload, ...rest)))
  }, Promise.resolve(null))
}
// export const either = (...formulas: Formula[]) => async (
//   payload: any,
//   ...rest: any[]
// ) => {
//   let flag = true
//   for (const formula of formulas) {
//     flag = flag && (await Promise.resolve(formula(payload, ...rest)))
//   }
//   return flag
// }

// export const neither = (...formulas: Formula[]) => async (
//   payload: any,
//   ...rest: any[]
// ) => {
//   let flag = false
//   for (const formula of formulas) {
//     flag = flag || (await Promise.resolve(formula(payload, ...rest)))
//   }
//   return flag
// }
