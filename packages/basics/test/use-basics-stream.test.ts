import {
  register,
  useAction,
  useCondition,
  useEvent,
  useStream,
  useTrigger,
} from '@bara/core'

import { useBasicsStream, useInit } from '../src'

describe('basics/use-basics-stream tests', () => {
  it('not emit init when disable from useBasicsStream', done => {
    const handler = jest.fn()

    const app = register(() => {
      useBasicsStream({ Init: false })
      useInit(handler)
    })

    setTimeout(() => {
      expect(handler).not.toHaveBeenCalled()
      done()
    }, 100)
  })
})
