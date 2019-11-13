import { Formula } from '../types'

export interface AttemptProp {
  to: Formula
  handle?: Formula
  silent?: boolean
}

/**
 * Attempt to try something that would throw an error.
 */
export const attempt = (attemptConfig: AttemptProp) => async (
  payload: any,
  ...rest: any[]
) => {
  const { to, handle, silent = true } = attemptConfig
  try {
    return await Promise.resolve(to(payload, ...rest))
  } catch (error) {
    if (handle) {
      handle({ payload, error }, ...rest)
    }
    if (!silent) {
      throw error
    }
  }
}
