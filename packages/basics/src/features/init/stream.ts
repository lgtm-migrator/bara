import { useStream } from '@bara/core'

import { BaraInit, ON_INITIALIZED } from './event'

export const useInitStream = () => {
  return useStream<BaraInit>(({ emit, setName, addEventType }) => {
    setName('dev.barajs.basics-init')
    addEventType(ON_INITIALIZED)
    setTimeout(() => {
      emit(ON_INITIALIZED, {})
    })
  })
}
