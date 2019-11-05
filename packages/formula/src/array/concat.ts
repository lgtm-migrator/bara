import { Formula } from '../types'

/**
 * Concat multiple result of any formula into single array
 */
export const concat = (arrays: Formula[]) => (payload: any, ...rest: any[]) => {
  let concatted: any[] = []
  for (const formula of arrays) {
    concatted = [...concatted, ...formula(payload, ...rest)]
  }
  return concatted
}

// concat([(data: any) => data.a, (data: any) => data.b])({
//   a: ['Hello'],
//   b: ['World'],
// }) // ?
