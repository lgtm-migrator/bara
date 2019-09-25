import { BaraSource } from './source'

export interface BaraContext {
  [key: string]: any
}

/**
 * Start with any context
 * @param ref Reference object
 */
export const fromContext = <T>(ctx: any): BaraSource<T> => {
  return ctx
}
