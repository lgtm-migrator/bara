import { evalExtra } from './extra'
import { ExtraParam, WithExtra } from './model'

export const groupWith = (expr: any | WithExtra) => (
  payload: any[],
  extras: Set<ExtraParam>,
) => {
  if (payload && payload.length) {
    const result: { [k: string]: any[] } = {}
    for (const p of payload) {
      const [groupWithId] = evalExtra(expr, p, extras)
      if (!(groupWithId in result)) {
        result[groupWithId as string] = []
      }
      result[groupWithId].push(p)
    }
    return result
  }
  return null
}
