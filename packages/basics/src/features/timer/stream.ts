import { useStream } from '@bara/core'

import { BaraTimer, ON_TIME_ELAPSED } from './event'

export function useTimerStream() {
  let second = 0
  return useStream<BaraTimer>(({emit, setName, addEventType}) => {
    setName('dev.barajs.basics-timer')
    addEventType(ON_TIME_ELAPSED)

    const timer = setInterval(() => {
      second += 1
      emit(ON_TIME_ELAPSED, { elapsed: second })
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  })
}
