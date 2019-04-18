import { useInit, useInitStream } from '@bara/basics'
import { register } from '@bara/core'
import { SET_BARN_STATE, setBarnState, useBarn, useBarnStream } from '../src'

describe('@bara/barn', () => {
  it('set initial state and set new state', done => {
    const handleNewState = jest.fn()
    const handleWrongState = jest.fn()
    const handleNestedState = jest.fn()

    const initialState = {
      hello: 'world',
      in: {
        the: {
          beginning: 'God created',
        },
      },
    }

    register(() => {
      useBarnStream(initialState)
      useInitStream()
      // Register state change handler
      useBarn('hello', handleNewState)
      useBarn('wrong-state-key', handleWrongState)
      useBarn('in.the.beginning', handleNestedState)

      useInit(() => {
        setBarnState('hello', 'world')
        setBarnState('in.the.beginning', 'God created the world!')
      })
    })

    setTimeout(() => {
      expect(handleWrongState).not.toHaveBeenCalled()
      expect(handleNewState).toHaveBeenCalled()
      expect(handleNewState).toHaveBeenCalledWith('world', {
        eventType: `dev.barajs.barn.${SET_BARN_STATE()}`,
        payload: {
          path: 'hello',
          state: {
            hello: 'world',
            in: { the: { beginning: 'God created the world!' } },
          },
        },
      })
      expect(handleNestedState).toHaveBeenCalledWith('God created the world!', {
        eventType: `dev.barajs.barn.${SET_BARN_STATE()}`,
        payload: {
          path: 'in.the.beginning',
          state: {
            hello: 'world',
            in: { the: { beginning: 'God created the world!' } },
          },
        },
      })
      done()
    }, 2000)
  })
})
