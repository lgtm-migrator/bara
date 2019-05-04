import { useInit, useInitStream } from '@bara/basics'
import { Listener, register, xs } from '@bara/core'
import { SET_BARN_STATE, setBarnState, useBarn, useBarnStream } from '../src'

describe('@bara/barn', () => {
  it('create MemoryStream', done => {
    const handler = jest.fn()
    const _$ = xs.never()
    const x = _$.remember()
    x.shamefullySendNext('bara')
    setTimeout(() => {
      x.addListener({
        next: handler,
      })
    }, 1000)

    setTimeout(() => {
      expect(handler).toHaveBeenCalledWith('bara')
      done()
    }, 1550)
  })

  it('set initial state and set new state', done => {
    const handleNewState = jest.fn()
    const handleWrongState = jest.fn()
    const handleNestedState = jest.fn()
    const handleHelloInitState = jest.fn()
    const handleInitAllState = jest.fn()

    const initialState = {
      hello: 'no-world',
      in: {
        the: {
          beginning: 'God created',
        },
      },
    }

    const { appStream } = register(() => {
      const stream = useBarnStream(initialState)

      // Handle initialize the state event after it has been initialized
      useInitStream()

      // Register state change handler
      useBarn('', handleInitAllState)
      const hello = useBarn('hello', handleHelloInitState)

      // Check initial value returned
      expect(hello).toEqual('no-world')

      useBarn('hello', handleNewState)
      useBarn('wrong-state-key', handleWrongState)
      useBarn('in.the.beginning', handleNestedState)

      setTimeout(() => {
        const expectValueOnInit = {
          eventType: 'dev.barajs.barn.set-barn-state',
          payload: {
            path: '',
            state: {
              hello: 'no-world',
              in: { the: { beginning: 'God created' } },
            },
          },
        }

        expect(handleInitAllState).toHaveBeenCalledWith(
          expectValueOnInit.payload.state,
          expectValueOnInit,
        )
        expect(handleHelloInitState).toHaveBeenCalledWith(
          'no-world',
          expectValueOnInit,
        )

        setBarnState('hello', 'world')
        setBarnState('in.the.beginning', 'God created the world!')

        const newHello = useBarn('hello', () => {
          return
        })
        expect(newHello).toEqual('world')
      }, 1000)
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
    }, 5000)
  })
})
