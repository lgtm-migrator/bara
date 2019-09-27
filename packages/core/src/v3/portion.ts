import { FlowConfig } from '.'
import xs, { Stream } from 'xstream'

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

export interface BaraPortionStandard<T, C, Mold> {
  mold?: BaraMold<Mold>
  init: BaraPortionInit<C, Mold>
  whenInitialized?: FlowConfig<T, C>
}

export type BaraPortionCustomFlow<T, C, M> = {
  [k: string]: FlowConfig<T, C>
}

export type BaraPortionPayload<T, C, M> = BaraPortionStandard<T, C, M>

export type BaraPortion<T, C, Mold> = (
  mold?: T extends any ? Mold : undefined,
) => BaraPortionPayload<T, C, Mold>

/**
 * Basic building block of a Bara application.
 * You can consider a portion is a Component in a React application.
 * @param payload Portion parameter as an object
 */
export const portion = <T, Context, Mold>(
  payload: BaraPortionPayload<T, Context, Mold>,
): BaraPortion<T, Context, Mold> => {
  return (mold: any) => payload
}

export const initPortion = <T, C, M>(pt: BaraPortionPayload<T, C, M>) => {
  console.log(`[Portion] Initializing...`)
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
  console.log(`[Portion] Initialized!`)
  const flows = registerFlow(pt, context, xstream)
}

export const registerFlow = <T, Context, Mold>(
  pt: BaraPortionPayload<T, Context, Mold>,
  context: Context,
  stream: Stream<T>,
) => {
  const { mold, whenInitialized, ...otherFlow } = pt
  // Bara Portion Life Cycle
  whenInitialized && whenInitialized!({ stream, mold, context })
  // for (const flowName in otherFlow) {
  //   const f = otherFlow[flowName]
  //   if (f) {
  // f({ mold, context, next })
  //   }
  // }
}
