import { Formula } from '../types'

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
