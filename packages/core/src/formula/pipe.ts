import { Formula } from './types'

/**
 * Pipe multiple formular together to make the execution in sequence
 * @param actions Multiple Fomulars
 */
export const pipe = (...actions: Formula[]) => async (payload: any) => {
  let lastResult = payload
  for (const action of actions) {
    const currentResult = await Promise.resolve(action(lastResult))
    lastResult = currentResult
  }
  return lastResult
}

/**
 * Pipe multiple formular together to make the execution in reverse sequence
 * @param actions Multiple Fomulars
 */
export const pipeReverse = (...actions: Formula[]) => async (payload: any) => {
  for (const action of actions) {
    await Promise.resolve(action(payload))
  }
  return payload
}
