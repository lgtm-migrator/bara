import { BaraContext } from './context'
import { BaraApplication } from './app'

/* Run Bara Application */
export const run = (app: BaraApplication) => {
  const context: BaraContext = {}
  const { portion } = app
  const all$ = wirePortion(portion)
  return { context }
}

const wirePortion = (portion: any) => {}

/**
 * Create main Bara application
 * @param payload Application parameter
 */
export const addContext = (ctx: any) => (context: BaraContext) => {
  const ctxId = 'ctx-'
  context[ctxId] = ctx
}
