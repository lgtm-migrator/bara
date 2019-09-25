import { BaraContext } from './context'

/**
 * BaraSource is any object that can publish one or more event
 */
export interface BaraSource<T> {
  context: BaraContext
}

export interface SourcePublisher<T, Ref> {
  name: string
}

/**
 * Add new publisher to the referencing context.
 * @param payload Publisher configuration
 */
export const flow = <T, Context>(payload: {
  /**
   * Filter preset provided from a publisher.
   */
  seep?: { [key: string]: (data: T) => boolean }
  /**
   * Publisher setup function, this function will be get called
   * when the stream is initializing.
   */
  func: (source: any, next: (data: T) => void) => void
}): SourcePublisher<T, any> => (source: any) => {
  const { func } = payload
  const emit = () => {}
  func(source, emit)
  return emit
}
