import xs, { Stream } from 'xstream'

export interface BaraStream<T, Context> {
  context: Context
  stream: Stream<T>
}

export const stream = () => {}
