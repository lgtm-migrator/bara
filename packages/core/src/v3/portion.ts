import { SourcePublisher } from './source'
import { BaraStream } from './stream'

export type BaraPortionInit<T, Context, Mold> = (
  mold: Mold,
) => BaraStream<T, Context>

export type BaraFlowNext = (...args: any) => void

export type BaraPortionFlow<T, Context, Mold> = {
  [k: string]: ({
    context: Context,
    mold: Mold,
    next: BaraFlowNext,
  }: any) => void
} & {
  whenInitialized: ({
    context: Context,
    mold: Mold,
    next: BaraFlowNext,
  }: any) => void
}

export interface BaraPortionPayload<T, Context, Mold> {
  mold?: Mold
  flow?: BaraPortionFlow<T, Context, Mold>
  init: BaraPortionInit<T, Context, Mold>
}

export type BaraPortion<T, Context, Mold> = (
  mold?: T extends any ? Mold : undefined,
) => BaraPortionPayload<T, Context, Mold>

/**
 * Basic building block of a Bara application.
 * @param payload Portion parameter as an object
 */
export const portion = <T, Context, Mold>(
  payload: BaraPortionPayload<T, Context, Mold>,
): BaraPortion<T, Context, Mold> => {
  const { mold, init, flow } = payload
  return (mold: any) => payload
}

export const initPortion = <T, Context, Mold>(
  pt: BaraPortionPayload<T, Context, Mold>,
) => {
  console.log(`[Portion] Initializing: ${portion}`)
  const { mold } = pt
  const stream = pt.init(mold!)
  const flows = registerFlow(pt, stream.context)
}

export const registerFlow = <T, Context, Mold>(
  pt: BaraPortionPayload<T, Context, Mold>,
  context: Context,
) => {
  const { mold, flow } = pt
  // Bara Portion Life Cycle
  const { whenInitialized, ...otherFlow } = flow!
  const next = (...args: any[]) => {
    console.log('meo', args)
  }
  whenInitialized && whenInitialized!({ mold, context, next })
  for (const flowName in otherFlow) {
    const f = otherFlow[flowName]
    if (f) {
      f({ mold, context, next })
    }
  }
}
