import { Formula } from '../types'

export const loopIn = (action: Formula) => async (
  payload: any,
  ...rest: any[]
) => {
  const result: any[] = []
  for (const key in payload) {
    if (key in payload && payload.hasOwnProperty(key)) {
      const r = await action([key, payload[key]], ...rest)
      result.push(r)
    }
  }
  return result
}
