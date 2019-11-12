import { lensProp } from '../object'

/**
 * Group array by deep properties.
 * @param prop
 */
export const groupBy = (prop: string) => (payload: any, ...rest: any[]) => {
  const accumulate: { [k: string]: any } = {}
  for (const element of payload) {
    const value = lensProp(prop)(element, ...rest)
    if (value) {
      if (!accumulate[value]) {
        accumulate[value] = []
      }
      accumulate[value] = [...accumulate[value], element]
    }
  }
  return accumulate
}
