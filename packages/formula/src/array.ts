import { Formula } from './types'

/**
 * Get first element from provided array
 */
export const takeFirst = () => (payload: any[]): any => {
  return payload && payload.length ? payload[0] : null
}

/**
 * Get last element from provided array
 */
export const takeLast = () => (payload: any[]): any => {
  return payload && payload.length ? payload[payload.length - 1] : null
}

/**
 * Get nth element from provided array
 */
export const takeNth = (num: number) => (payload: any[]): any => {
  return payload && payload.length ? payload[num] : null
}

/**
 * Imutable slicing an array into sub-array.
 * @param startIndex Begin
 * @param endIndex End
 */
export const slice = (startIndex: number, endIndex: number) => (
  payload: any[],
) => {
  const copiedPayload = [...payload]
  return copiedPayload.slice(startIndex, endIndex)
}

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
