import { Formula } from './types'

export const loopOf = (expr: any[], action: Formula) => async (
  payload: any,
): Promise<any[]> => {
  const list: any[] = expr
  const result: any[] = []
  for (const item of list) {
    result.push(await action(item, payload))
  }
  return result
}

export const loopIn = (action: Formula) => async (payload: any) => {
  const result: any[] = []
  for (const key in payload) {
    if (payload[key] !== undefined) {
      const r = await action([key, payload[key]], payload)
      result.push(r)
    }
  }
  return result
}
