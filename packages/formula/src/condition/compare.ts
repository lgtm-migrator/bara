import { Formula } from '../types'

export const eq = (first: Formula, second: Formula) => async (
  payload: any,
  ...rest: any[]
) => {
  const firstVal = await Promise.resolve(first(payload, ...rest))
  const secondVal = await Promise.resolve(second(payload, ...rest))
  return firstVal === secondVal
}

export const neq = (first: Formula, second: Formula) => async (
  payload: any,
  ...rest: any[]
) => {
  const firstVal = await Promise.resolve(first(payload, ...rest))
  const secondVal = await Promise.resolve(second(payload, ...rest))
  return firstVal !== secondVal
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
