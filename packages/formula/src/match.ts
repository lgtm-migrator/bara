import { Formula } from './types'

export interface FormulaMatchProps {
  [k: string]: Formula
}

export const match = (props: FormulaMatchProps) => async (
  matchingCase: string,
  payload: string,
  ...rest: any[]
) => {
  if (matchingCase in props) {
    await props[matchingCase](payload, ...rest)
  } else {
    if ('default' in props) {
      await props.default(payload, ...rest)
    }
  }
}

// import { loopOf } from './loop'
// loopOf(
//   ['KT2', 'GN'],
//   match({
//     KT: console.log,
//     GN: console.warn,
//     default: () => console.error('default'),
//   }),
// )({ hello: 'world' })
