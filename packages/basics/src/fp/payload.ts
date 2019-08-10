import consola from './consola'
import { ExtraParam, WithExtra } from './model'

export const previousPayload: WithExtra = (level?: number) => (
  payload: any,
  extras: Set<ExtraParam>,
) => {
  consola.debug(`Previous payload: ${payload} ${extras} ${level}`)
  return payload
}
