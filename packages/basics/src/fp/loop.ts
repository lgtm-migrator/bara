import pAll from 'p-all'

import consola from './consola'

import { evalExtra, extraIn } from './extra'
import { DoWithAction, ExtraParam, WithExtra } from './model'

export const loopOf = (expr: any[] | WithExtra, action: DoWithAction) => async (
  payload: any,
  extras: Set<ExtraParam>,
) => {
  const evalExpr = evalExtra(expr, payload, extras)
  const list: any[] = evalExpr[0]
  consola.info(
    `loopOf: ${list} - payload: ${payload} - extras: ${JSON.stringify(
      Array.from(extras),
    )}`,
  )
  for (const item of list) {
    const nextExtras = extraIn('loopOf', item)(extras)
    consola.info(`loopOf nextExtras: ${JSON.stringify(nextExtras)}`)
    await action(payload, nextExtras)
  }
}

export const loopReverse = (action: DoWithAction) => async (
  payload: any[],
  extras: Set<ExtraParam>,
) => {
  const result: any[] = []
  let i = payload.length
  while (i) {
    i -= 1
    const nextExtras = extraIn('loopReverse', payload[i])(extras)
    const r = await action(payload[i], nextExtras)
    result.push(r)
  }
  return result
}

export const loopIn = (action: DoWithAction) => async (
  payload: any,
  extras: Set<ExtraParam>,
) => {
  const result: any[] = []
  for (const item in payload) {
    if (payload[item] !== undefined) {
      const nextExtras = extraIn('loopIn', item)(extras)
      const r = await action({ key: item, value: payload[item] }, nextExtras)
      result.push(r)
    }
  }
  return result
}

export const loopParallel = (
  config: { concurrency: number },
  action: DoWithAction,
) => async (payload: any, extras: Set<ExtraParam>) => {
  const all = payload.map((data: any) => () => action(data, extras))
  return await pAll(all, config)
}
