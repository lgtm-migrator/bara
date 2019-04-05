import { createEventType } from '@bara/core'

export interface BaraTimer {
  elapsed: number
}

export const ON_TIME_ELAPSED = createEventType('ON_TIME_ELAPSED')
