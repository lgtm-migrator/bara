import { DoWithAction, ExtraParam } from './model'

export const concatWith = (
  ...actions: Array<string | any[] | DoWithAction>
) => (payload: any, extras: Set<ExtraParam>) => {
  const isStr = typeof payload === 'string'
  let result: any = payload
  for (const action of actions) {
    if (isStr) {
      const next =
        typeof action === 'string'
          ? action
          : (action as DoWithAction)(payload, extras)
      result += next
      //
    } else {
      const next =
        typeof action === 'function'
          ? (action as DoWithAction)(payload, extras)
          : action
      result = [...result, ...next]
    }
  }
  return result
}
