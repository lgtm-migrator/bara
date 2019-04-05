import {
  register,
  useAction,
  useCondition,
  useEvent,
  useStream,
  useTrigger,
} from '@bara/core'
import { useTimerElapsed } from '../src/features/timer'

describe('basics/init tests', () => {
  it('should emit initialization event', done => {
    const timerCheck = jest.fn()
    const app = register(() => {
      useTimerElapsed(3, timerCheck)
    })
    setTimeout(() => {
      expect(timerCheck).toHaveBeenCalled()
      expect(timerCheck).toHaveBeenCalledWith(3)
      done()
    }, 4000)
  })
})
