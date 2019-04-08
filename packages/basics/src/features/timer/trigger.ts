import {
  createEventType,
  useAction,
  useCondition,
  useEvent,
  useTrigger,
} from '@bara/core'

import { BaraTimer, ON_TIME_ELAPSED } from './event'

export const useTimerElapsedTrigger = (
  atSecond: number,
  callback: (...args: any[]) => void,
) => {
  return useTrigger<BaraTimer>(() => {
    const event = useEvent<BaraTimer>(ON_TIME_ELAPSED)
    const condition = useCondition<BaraTimer>(
      timer => (timer as BaraTimer).elapsed === atSecond,
    )
    const action = useAction<BaraTimer>(callback)
    return { event, condition, action }
  })
}
