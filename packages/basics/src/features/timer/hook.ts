import { useTrigger } from '@bara/core'

import { BaraTimer } from './event'
import { useTimerStream } from './stream'
import { useTimerElapsedTrigger } from './trigger'

export const useTimerElapsed = (
  atSecond: number,
  callback: (...args: any[]) => void,
) => {
  useTimerStream()
  return useTimerElapsedTrigger(atSecond, ({ elapsed }) => {
    callback(elapsed)
  })
}

// export const useIntervalTime = () => {}
