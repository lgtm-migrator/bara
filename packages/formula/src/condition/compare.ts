import { Formula } from '../types'

export const eq = (first: Formula, second: Formula) => async (
  payload: any,
  ...rest: any[]
) => {
  const firstVal = await Promise.resolve(first(payload, ...rest))
  const secondVal = await Promise.resolve(second(payload, ...rest))
  return firstVal === secondVal
}

// const boo = eq(
//   data => {
//     return data.one
//   },
//   data => data.enable
// )([{ one: '1', enable: true }, { one: '2', enable: false }])
// boo

// const boo = eq(data => data.data1, data => data.data2)({
//   data1: 'sample',
//   data2: 'example',
// })

// boo

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
