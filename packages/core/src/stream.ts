import { Stream } from 'xstream'

export interface BaraStream<T, Context> {
  context: Context
  stream: Stream<T>
}

export type StreamPayload = any | number | string | void | boolean // TODO add stream payload metadata for future references

export const initializeStream = <T>(
  stream: Stream<T>,
  payload: any,
  initializer: (...args: any[]) => void,
) => {
  const dummyFunc = (...args: any[]): undefined => undefined
  const dummyListener = {
    next: dummyFunc,
    complete: dummyFunc,
  }

  stream.addListener(dummyListener)
  initializer(payload)
  stream.removeListener(dummyListener)
}
