import xs, { Stream } from 'xstream'
import { BaraSource } from './flow'

export interface BaraStream<T, Context> {
  context: Context
  stream: Stream<T>
}
