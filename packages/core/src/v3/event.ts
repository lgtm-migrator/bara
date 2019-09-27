import consola from './consola'

import { BaraPortion } from '.'

export const popEvent = <T, C, M>(portion: BaraPortion<T, C, M>) => {
  const { ...flows } = portion()
  consola.log(flows)
  return { whenInitialized: (callback: (...args: any) => void) => () => {} }
}
