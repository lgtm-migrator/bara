import {
  register,
  useAction,
  useCondition,
  useEvent,
  useStream,
  useTrigger,
} from '@bara/core'
import { useInit, useInitStream } from '../src/features/init'

describe('basics/init tests', () => {
  it('should emit initialization event', done => {
    const initCheck = jest.fn()
    const app = register(() => {
      useInitStream()
      useInit(initCheck)
    })
    setTimeout(() => {
      expect(initCheck).toHaveBeenCalled()
      done()
    }, 1000)
  })
})
