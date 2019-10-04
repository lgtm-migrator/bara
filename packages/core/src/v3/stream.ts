import xs, { Stream } from 'xstream'

export interface BaraStream<T, Context> {
  context: Context
  stream: Stream<T>
}

export interface StreamPayload {}

export const stream = () => {}

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
