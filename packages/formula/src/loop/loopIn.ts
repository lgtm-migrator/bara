import { Formula } from '../types'

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
