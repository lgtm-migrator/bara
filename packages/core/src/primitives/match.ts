import consola from './consola'

import { doSequence } from './do'
import { evalExtra, extraIn, extraOut } from './extra'
import { DoWithAction, ExtraParam, WithExtra } from './model'

export const inCase = (
  indicatorVal: string,
  ...actions: DoWithAction[]
) => async (payload: any, extras: Set<ExtraParam>) => {
  const indicatorSource = extraOut('match', 0)(extras)
  // console.log( `In Case: payload ${payload} - extras: ${JSON.stringify( extras)} - indicatorSource: ${indicatorSource}`)
  if (indicatorSource === indicatorVal) {
    return await doSequence(...actions)(payload, extras)
  }
  return 'NOT_IN_CASE'
}

/**
 * matchBy is the switch case with single property checker as first params
 * then this function will take `inCase` as the conditional checker to execute its function
 */
export const match = (
  expr: string | any | WithExtra,
  ...cases: any[]
) => async (payload: any, extras: Set<ExtraParam>) => {
  // consola.info( `match: payload ${payload} - extras: ${JSON.stringify(Array.from(extras))}`)
  let lastResult = payload
  const evalExpr = evalExtra(expr, payload, extras)
  for (const checkInCase of cases) {
    const nextExtras = extraIn('match', evalExpr[0])(extras)
    consola.info(`match nextExtras: ${JSON.stringify(Array.from(nextExtras))}`)
    const currentResult = await checkInCase(payload, nextExtras)
    if (currentResult !== 'NOT_IN_CASE') {
      lastResult = currentResult
      // consola.info(`Check Result ${evalExpr}: ${JSON.stringify(lastResult)}`)
      break
    }
  }
  return lastResult
}
