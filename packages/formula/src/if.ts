import { Formula } from './types'

export const ifElse = (
  ifStm: Formula,
  thenStm: Formula,
  elseStm: Formula,
) => async (payload: any, ...rest: any[]) => {
  if (await Promise.resolve(ifStm(payload, ...rest) || false)) {
    await Promise.resolve(thenStm(payload, ...rest))
  } else {
    await Promise.resolve(elseStm(payload, ...rest))
  }
}
