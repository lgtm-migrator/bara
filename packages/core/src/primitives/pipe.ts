import { DoWithAction, ExtraParam } from './model'

export const pipe = (...actions: DoWithAction[]) => async (
  payload: any,
  extras: Set<ExtraParam>,
) => {
  let lastResult = payload
  for (const action of actions) {
    const currentResult = await Promise.resolve(action(lastResult, extras))
    lastResult = currentResult
  }
  return lastResult
}

/**
 * Execute each action in order with following by previous result.
 */
export const pipeReverse = (...actions: DoWithAction[]) => async (
  payload: any,
  extras: Set<ExtraParam>,
) => {
  for (const action of actions) {
    await Promise.resolve(action(payload, extras))
  }
  return payload
}
