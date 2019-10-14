import consola from './consola'

import { extraOut } from './extra'
import { ExtraParam, WithExtra } from './model'

export const withLoopingValue: WithExtra = (level?: number) => (
  payload: any, // tslint:disable-line
  extras: Set<ExtraParam>,
) => {
  const result = extraOut('loopOf', level)(extras)
  consola.debug(payload)
  return result
}

export const withLoopInValue: WithExtra = (level?: number) => (
  payload: any, // tslint:disable-line
  extras: Set<ExtraParam>,
) => {
  const result = extraOut('loopIn', level)(extras)
  consola.debug(payload)
  return result
}

export const withMatchingValue: WithExtra = (level?: number) => (
  // tslint:disable-next-line
  payload: any,
  extras: Set<ExtraParam>,
) => {
  consola.debug(payload)
  return extraOut('match', level)(extras)
}

export const withPreviousPayload: WithExtra = () => (
  payload: any,
  extras: Set<ExtraParam>,
) => {
  consola.debug(extras)
  return payload
}
