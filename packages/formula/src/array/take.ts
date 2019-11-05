import { Formula } from '../types'

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
