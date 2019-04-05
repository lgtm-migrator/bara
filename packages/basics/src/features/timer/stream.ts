import { useStream } from '@bara/core'

import { BaraTimer, ON_TIME_ELAPSED } from './event'

export function useTimerStream() {
  useStream<BaraTimer>({
    name: 'Bara Timer Stream',
    eventTypes: [ON_TIME_ELAPSED],
    setup: ({ emit }) => {
      let second = 0
      setInterval(() => {
        second += 1
        emit(ON_TIME_ELAPSED, { elapsed: second })
      }, 1000)
    },
  })
}
