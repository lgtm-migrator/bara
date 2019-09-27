import xs, { Stream } from 'xstream'
import { BaraSource } from './flow'

export interface BaraStream<T, Context> {
  context: Context
  stream: Stream<T>
}

export const stream = <T, Context>(payload: {
  context: Context
  source: BaraSource<T>
}): BaraStream<T, Context> => {
  const producer = {
    start: () => {},
    stop: () => {},
  }
  const stream = xs.createWithMemory<T>(producer)
  return { stream, context: payload.context }
}
