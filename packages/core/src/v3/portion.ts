import consola from './consola'

import xs, { Stream } from 'xstream'
import { FlowConfig } from '.'

/**
 * BaraMoldObject is the object contains all values
 * of the portion's configuration
 */
export interface BaraMoldObject {
  [k: string]: any
}

/**
 * BaraMold is the type reference of BaraMoldObject
 */
export type BaraMold<M> = M extends BaraMoldObject ? BaraMoldObject : undefined

export type BaraPortionInit<C, M> = (mold?: BaraMold<M>) => C

export type BaraFlowNext = <T>(data: T) => void

export type BaraFlow<Context, Mold> = ({
  context: Context,
  mold: Mold,
  next: BaraFlowNext,
}: any) => void

export interface BaraPortionStandard<T, C, M> {
  [k: string]: FlowConfig<T, C> | any | undefined
  mold?: BaraMold<M>
  init: BaraPortionInit<C, M>
  whenInitialized?: FlowConfig<T, C>
}

export type BaraPortionCustomFlow<T, C> = {
  [k: string]: FlowConfig<T, C> | any | undefined
}

export type BaraPortionPayload<T, C, M> = {
  [k: string]: FlowConfig<T, C> | any | undefined
  mold?: BaraMold<M>
  init: BaraPortionInit<C, M>
  whenInitialized?: FlowConfig<T, C>
}

export type BaraPortion<T, C, M> = (
  mold?: BaraMold<M>,
) => BaraPortionPayload<T, C, M>

/**
 * Basic building block of a Bara application.
 * You can consider a portion is a Component in a React application.
 *
 * This function will override and mold if existed
 * @param payload Portion parameter as an object
 */
export const portion = <T, C, M>(
  payload: BaraPortionPayload<T, C, M>,
): BaraPortion<T, C, M> => {
  return (userMold?: BaraMold<M>) => {
    // Override usage mold with builtins mold
    const { mold } = payload
    const overrideMold: BaraMold<M> = { ...mold, ...userMold } as BaraMold<M>

    return { ...payload, mold: overrideMold }
  }
}

export const initPortion = <T, C, M>(pt: BaraPortionPayload<T, C, M>) => {
  const { mold, init } = pt

  // Each portion initializer should return the reference context for later use.
  const context = init(mold!)

  // Create Stream for this context event
  const xstream = xs.createWithMemory<T>({
    start: listener => {
      listener.next({} as T)
    },
    stop: () => {},
  })

  // Register Flow from this stream
  consola.info(`[Portion] Initialized!`)
  const flows = registerFlow(pt, context, xstream)
  return { flows }
}

export const registerFlow = <T, Context, Mold>(
  pt: BaraPortionPayload<T, Context, Mold>,
  context: Context,
  stream: Stream<T>,
) => {
  const { mold, whenInitialized, ...otherFlow } = pt
  const flowOperators: { [k: string]: any } = {}
  // Bara Portion Life Cycle
  if (!!whenInitialized) {
    const flow = whenInitialized!({ stream, mold, context })
    flowOperators['whenInitialized'] = flow
  }
  // for (const flowName in otherFlow) {
  //   const f = otherFlow[flowName]
  //   if (f) {
  // f({ mold, context, next })
  //   }
  // }
  return flowOperators
}
