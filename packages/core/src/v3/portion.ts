import shortid from 'shortid'
import xs, { Stream } from 'xstream'

import consola from './consola'
import { FlowConfig, FlowSemiConfig } from './flow'

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
  [k: string]: FlowConfig<T, C, M> | any | undefined
  mold?: BaraMold<M>
  init: BaraPortionInit<C, M>
  whenInitialized?: FlowConfig<T, C, M>
}

export interface BaraPortionPayload<T, C, M> {
  [k: string]: FlowConfig<T, C, M> | any | undefined
  name: string
  mold?: BaraMold<M>
  init: BaraPortionInit<C, M>
  whenInitialized?: FlowConfig<T, C, M>
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
    const { mold, name } = payload
    if (!name) {
      throw new Error(`[Portion] A portion name should be specified!`)
    }
    const overrideMold: BaraMold<M> = { ...mold, ...userMold } as BaraMold<M>

    return { ...payload, mold: overrideMold }
  }
}

export const initPortion = <T, C, M>(pt: BaraPortionPayload<T, C, M>) => {
  const { mold, init, name } = pt

  // Each portion initializer should return the reference context for later use.
  const context = init(mold!)

  // Create Stream for this context event
  const stream = xs.createWithMemory<T>({
    start: listener => {
      listener.next({} as T)
    },
    stop: () => {},
  })

  // Register Flow from this stream
  const rawFlows = registerFlow(pt, context, stream)
  return { id: 'Id system will be implemented soon', name, rawFlows, stream }
}

export const registerFlow = <T, C, M>(
  pt: BaraPortionPayload<T, C, M>,
  context: C,
  stream: Stream<T>,
) => {
  const { mold, whenInitialized, ...customFlows } = pt
  const flowOperators: { [k: string]: FlowSemiConfig<T, C> } = {}
  const flowPayload = { stream, mold, context }

  // Bara Portion Life Cycle
  // TODO merge this process with below loop for extensible
  if (!!whenInitialized) {
    const rawFlow = whenInitialized.func(flowPayload)
    flowOperators.whenInitialized = rawFlow
  }

  // Initialize all custom flows, all the flow should start with 'when' as naming convention
  for (const flowName in customFlows) {
    if (flowName.startsWith('when') && flowName in customFlows) {
      const rawFlow = (customFlows[flowName] as FlowConfig<T, C, M>).func(
        flowPayload,
      )
      flowOperators[flowName] = rawFlow
    }
  }
  return flowOperators
}
