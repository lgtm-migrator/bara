import { Formula } from './types'

export const loopOf = (expr: any[], action: Formula) => async (
  payload: any,
  ...rest: any[]
): Promise<any[]> => {
  const list: any[] = expr
  const result: any[] = []
  for (const item of list) {
    result.push(await action(item, payload, ...rest))
  }
  return result
}

export const loopIn = (action: Formula) => async (
  payload: any,
  ...rest: any[]
) => {
  const result: any[] = []
  for (const key in payload) {
    if (payload[key] !== undefined) {
      const r = await action([key, payload[key]], payload, ...rest)
      result.push(r)
    }
  }
  return result
}
