import { useStream } from '@bara/core'

import { BaraInit, ON_INITIALIZED } from './event'

export const useInitStream = () => {
  useStream<BaraInit>({
    name: 'Bara App Initialization',
    eventTypes: [ON_INITIALIZED],
    setup: ({ emit }) => {
      emit(ON_INITIALIZED, {})
    },
  })
}
