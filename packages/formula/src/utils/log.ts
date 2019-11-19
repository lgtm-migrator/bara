import { Formula } from '../types'

/**
 * Log function useful for debugging and logging any payload
 * and leave the stream intact.
 * @param action Any formula returning value will be logged here
 * @param payloadOnly Is show only payload
 * @param adapter Logging adapter. @default(console)
 * @param type Type of logging adapter. @default: 'log'
 */
export const log = (
  action?: Formula | undefined | null,
  payloadOnly: boolean = true,
  adapter: any = console,
  type: string = 'log',
) => async (...args: any[]) => {
  if (typeof action === 'function') {
    const result = await action(...args)
    adapter[type](result)
    return result
  }
  if (payloadOnly) {
    adapter[type](args[0])
  } else {
    adapter[type](...args)
  }

  return args
}

// const proxy = (data: any) => data
// debug(proxy)(1, [2, 3, 4]) // ?
// proxy(debug())(2, [3, 4, 5]) // ?
// proxy(debug(null, false))(2, [3, 4, 5]) // ?
