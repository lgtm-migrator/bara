import consola from './consola'
import { ExtraParam, WithExtra } from './model'

export const evalExtra = (
  expr: any | WithExtra,
  payload: any,
  extras: Set<ExtraParam>,
) => {
  let evalExpr = expr
  // consola.info(expr, payload, extras)
  // Execute WithExtra function to get value by this payload/extras
  if (typeof expr === 'function') {
    // consola.info(`evalExtra ${JSON.stringify(extras)}`)
    evalExpr = expr(payload, extras)
    // extras.shift() // Remove first extra to replaces it with this newly evaluated value.
  }
  return [evalExpr, extras]
}

export const extraIn = (key: string, val: any) => (
  extras: Set<ExtraParam> = new Set(),
): Set<ExtraParam> => {
  extras.add({ key, val })
  return extras
}

// TODO implement the level manager for accessing the value multi nested levels
export const extraOut = (key: string, level: number = 0) => (
  extras: Set<ExtraParam> = new Set(),
): any => {
  let l = 0
  for (const extra of Array.from(extras).reverse()) {
    const { key: k, val } = extra
    consola.info(`extraOut: ${key}, ${k}, ${val}`)
    if (key === k) {
      if (level === l) {
        return val
      }
      l += 1
    }
  }
  return null
}
