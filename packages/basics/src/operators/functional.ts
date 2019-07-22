// ==================================================================================================
// Do => Execute action in different ways
export interface ExtraParam {
  key: string
  val: any
}

export type DoWithAction = (
  payload: any,
  extras: ExtraParam[],
) => Promise<any> | any | void

export type WithExtra = (
  level: number,
) => (payload: any, extras: ExtraParam[]) => Promise<any> | any | void

// ==================================================================================================
// Extra params manager
export const evalExtra = (
  expr: any | WithExtra,
  payload: any,
  extras: ExtraParam[] = [],
) => {
  let evalExpr = expr
  // console.info(expr, payload, extras)
  // Execute WithExtra function to get value by this payload/extras
  if (typeof expr === 'function') {
    // console.info(`evalExtra ${JSON.stringify(extras)}`)
    evalExpr = expr(payload, extras)
    extras.shift() // Remove first extra to replaces it with this newly evaluated value.
  }
  return [evalExpr, extras]
}

export const extraIn = (key: string, val: any) => (
  extras: ExtraParam[] = [],
) => [...extras, { key, val }]

// TODO implement the level manager for accessing the value multi nested levels
export const extraOut = (key: string, level: number = 0) => (
  extras: ExtraParam[] = [],
) => {
  let l = 0
  let i = extras.length
  while (i) {
    // console.debug(`Extra out ${i}: ${extras[i]}`)
    const { key: k, val } = extras[i]
    if (key === k) {
      if (level === l) {
        return val
      }
      l += 1
    }
    i -= 1
  }
  return null
}

// ==================================================================================================

// TODO add function 'alias' to create alias function based on this function
// TODO add function 'doParallel' to execute all actions at once.
export const doSquence = (...actions: DoWithAction[]) => async (
  payload: any,
  extras: ExtraParam[] = [],
) => {
  let lastResult = payload
  for (const action of actions) {
    // console.info(`doSequence: ${JSON.stringify(extras, null, 2)}`)
    const currentResult = await Promise.resolve(action(lastResult, extras))
    lastResult = currentResult
  }
  return lastResult
}

export const doWithEach = (...actions: DoWithAction[]) => async (
  payload: any,
  extras: ExtraParam[] = [],
) => {
  const all = actions.map(action => action(payload, extras))
  return await Promise.all(all)
}

// ==================================================================================================
// Withs

export const withLoopingValue: WithExtra = (level?: number) => (
  extras: ExtraParam[],
) => {
  return extraOut('loopOf', level)(extras)
}

export const withMatchingValue: WithExtra = (level?: number) => (
  extras: ExtraParam[],
) => {
  return extraOut('match', level)(extras)
}

// ==================================================================================================
// If-else-switch case => Match in conditional Way
export const inCase = (
  indicatorVal: string,
  ...actions: DoWithAction[]
) => async (payload: any, extras: ExtraParam[]) => {
  const [indicatorSource] = extraOut('match', 0)(extras)
  if (indicatorSource === indicatorVal) {
    return await doSquence(...actions)(payload, extras)
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
) => async (payload: any, extras: ExtraParam[]) => {
  // console.info(`match ${JSON.stringify(extras)}`)
  let lastResult = payload
  const evalExpr = evalExtra(expr, payload, extras)
  // console.info(`match evalExpr from ${expr} to ${JSON.stringify(evalExpr)}`)
  for (const checkCase of cases) {
    const currentResult = await checkCase(
      payload,
      extraIn('match', evalExpr)(extras),
    )
    if (currentResult !== 'NOT_IN_CASE') {
      lastResult = currentResult
      // console.info(`Check Result ${evalExpr}: ${JSON.stringify(lastResult)}`)
      break
    }
  }
  return lastResult
}

// ==================================================================================================
export const loopOf = (list: any[], action: DoWithAction) => async (
  payload: any,
  extras: ExtraParam[] | any = [],
) => {
  // console.info(`loopOf ${extras}`)
  for (const item of list) {
    await action(payload, extraIn('loopOf', item)(extras))
  }
}

export const toCurry = (func: DoWithAction) => (
  data: any,
): Promise<any> | any | undefined | void => func(data, [])

// ==================================================================================================
export const debug = (...params: any[]) => {
  // tslint:disable-next-line
  console.log(JSON.stringify(params, null, 2))
  return params
}
