import { useInit } from '@bara/basics'
import { register } from '@bara/core'
import { useBarn, useBarnStream } from '../src'

describe('barn', () => {
  it('set initial state and set new state', done => {
    const handleNewState = jest.fn()
    const handleWrongState = jest.fn()
    const initialState = {
      hello: 'world',
    }

    register(() => {
      const [setState] = useBarnStream(initialState)

      useBarn('hello', handleNewState) // Handle change on hello property
      useBarn('wrong-state-key', handleWrongState) // This won't be invoke

      useInit(() => {
        setState({ hello: 'world' })
      })
    })

    setTimeout(() => {
      expect(handleWrongState).not.toHaveBeenCalled()
      expect(handleNewState).toHaveBeenCalled()
      expect(handleNewState).toHaveBeenCalledWith(
        { hello: 'world' },
        {
          eventType: 'dev.barajs.barn.set-state',
          payload: { hello: 'world' },
        },
      )
      done()
    }, 2000)
  })
})
