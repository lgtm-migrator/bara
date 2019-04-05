import {
  register,
  useAction,
  useCondition,
  useEvent,
  useStream,
  useTrigger,
} from '@bara/core'
import { useTimerElapsed } from '../src/features/timer'

describe('basics/timer tests', () => {
  it('should exec an action when 3s elapsed event', done => {
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
