import xs, { Stream, Listener } from 'xstream'
import consola from './consola'

import { BaraContext } from './context'
import { BaraType } from './type'

const dummyFunc = (...args: any[]): undefined => undefined
const dummyListener = {
  next: dummyFunc,
  complete: dummyFunc,
}

/**
 * XPayload: Is the configuration from user.
 * XConfig: Is the result after configuration.
 */

/**
 * BaraSource is any object that can publish one or more event
 */
export interface BaraSource<T> {
  context: BaraContext
}

export interface FlowUserPayload<T, C, M> {
  mold: M
  context: C
  stream: Stream<T>
  next: (data: T) => void
  action: (data: T) => Promise<any>
}

export interface FlowSemiConfig<T, C> {
  bara: BaraType
  context: C
  subStream: Stream<T>
}

export type FlowConfig<T, C> = (context: BaraContext) => FlowSemiConfig<T, C>

export interface FlowPayload<T, C, M> {
  /**
   * Publisher setup function, this function will be get called
   * when the stream is initializing.
   */
  bootstrap: (payload: FlowUserPayload<T, C, M>) => void
  /**
   * Conditional filter preset provided from a publisher.
   */
  seep?: { [key: string]: (data: T) => boolean }
}

/**
 * Add new publisher to the referencing context.
 * @param payload Publisher configuration
 */
export const flow = <T, C, M>(
  payload: FlowPayload<T, C, M>,
): FlowConfig<T, C> => {
  const { bootstrap } = payload
  return (flowUserPayload: FlowUserPayload<T, C, M>) => {
    let bootstrapPayload = { ...flowUserPayload }
    // Setup Flow Emitter Action
    let next = (listener: Listener<T>) => (data: T) => {
      listener.next(data)
    }
    let actionRef = (data: T) => Promise.resolve(data)

    const subStream = xs.createWithMemory<T>({
      start: listener => {
        const nextRef = next(listener)
        bootstrapPayload.next = nextRef
        bootstrapPayload.action = actionRef
      },
      stop: () => {
        // Place the clean up function here
      },
    })

    subStream.addListener(dummyListener)
    bootstrap(bootstrapPayload)
    subStream.removeListener(dummyListener)
    consola.info(`[Flow] Bootstrapped!`)

    return {
      bara: 'Flow',
      context: flowUserPayload.context,
      subStream,
    }
  }
}
