import { useStream } from '@bara/core'

import { ON_INITIALIZED, ON_TIME_ELAPSED } from '../events'

export function useBaraBasics() {
  useStream<any>({
    name: 'Bara App Initialization',
    eventTypes: [ON_INITIALIZED],
    setup: ({ emit }) => {
      emit(ON_INITIALIZED, {})
    },
  })

  useStream<number>({
    name: 'Bara App Timer',
    eventTypes: [ON_TIME_ELAPSED],
    setup: ({ emit }) => {
      let second = 0
      setInterval(() => {
        second += 1
        emit(ON_TIME_ELAPSED, second)
      }, 1000)
    },
  })
}
