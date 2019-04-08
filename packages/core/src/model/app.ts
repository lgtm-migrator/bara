import { Stream } from 'xstream'
import { BaraStreamPayload } from './stream'

export type AppStream<T> = Stream<BaraStreamPayload<T>>
