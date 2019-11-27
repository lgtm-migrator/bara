import xs, { Listener, Stream } from 'xstream'

import { BaraContext } from './context'
import { initializeStream } from './stream'
import { BaraType } from './type'

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

export interface BaraSeep<T> {
  [key: string]: (...args: any[]) => (data: T, ...rest: any[]) => boolean
}

export interface FlowUserPayload<T, C, M> {
  mold: M
  context: C
  stream: Stream<T>
  next: (data?: T) => void
  action: (data: T) => Promise<any>
  awaitable: (data: T) => Stream<T>
}

export interface FlowSemiConfig<T, C> {
  bara: BaraType
  context: C
  subStream: Stream<T>
  seep?: BaraSeep<T>
}

export interface FlowConfig<T, C, M> {
  bootstrap: (payload: FlowUserPayload<T, C, M>) => void
  seep?: BaraSeep<T>
  func: (context: BaraContext) => FlowSemiConfig<T, C>
}

export interface FlowPayload<T, C, M> {
  /**
   * Publisher setup function, this function will be get called
   * when the stream is initializing.
   */
  bootstrap: (payload: FlowUserPayload<T, C, M>) => void
  /**
   * Conditional filter preset provided from a publisher.
   */
  seep?: BaraSeep<T>
}

/**
 * Add new publisher to the awaitActionerencing context.
 * @param payload Publisher configuration
 */
export const flow = <T, C, M>(
  payload: FlowPayload<T, C, M>,
): FlowConfig<T, C, M> => {
  const { bootstrap, seep } = payload

  // TODO create separated awaitableFlow operator
  const func = (flowUserPayload: FlowUserPayload<T, C, M>) => {
    const bootstrapPayload = { ...flowUserPayload }
    // Setup Flow Emitter Action
    const next = (listener: Listener<T>) => (data?: T) => {
      listener.next(data!)
    }

    const actionRef = (data: T | any) => Promise.resolve(data)

    const subStream = xs.createWithMemory<T>({
      start: listener => {
        const nextRef = next(listener)

        // Patch assign to the bootstrap payload
        // TODO make this payload immutable
        bootstrapPayload.next = nextRef
        bootstrapPayload.action = actionRef
      },
      stop: () => {
        // Place the clean up function here
      },
    })

    initializeStream(subStream, bootstrapPayload, bootstrap)

    return {
      bara: BaraType.Flow,
      context: flowUserPayload.context,
      subStream,
      seep,
    }
  }

  return { bootstrap, seep, func }
}
