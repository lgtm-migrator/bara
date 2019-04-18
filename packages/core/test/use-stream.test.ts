import { createEventType, register, useStream } from '../src'
import { useStreamHook } from '../src/hooks/use-stream'
import { BaraStreamConfig } from '../src/model'

describe('hooks/use-stream', () => {
  it('use stream with a callback function', done => {
    const handler = jest.fn()
    const doneHandler = jest.fn()

    const ON_TIME_STARTED = createEventType('ON_TIME_STARTED')
    const ON_TIME_ELAPSED = createEventType('ON_TIME_ELAPSED')

    let removeListener

    register(() => {
      const { _$ } = useStream<number>(({ emit, setName, addEventTypes }) => {
        setName('dev.barajs.stream.timer')

        let second = 0

        addEventTypes([ON_TIME_STARTED, ON_TIME_ELAPSED])

        const timer = setInterval(() => {
          second += 1
          emit(ON_TIME_ELAPSED, second)
        }, 1000)

        setTimeout(() => {
          emit(ON_TIME_STARTED, second)
        })

        // Do stream clean up when idle!
        return () => {
          clearInterval(timer)
          doneHandler()
        }
      })

      const listener = {
        next: handler,
      }

      _$.addListener(listener)

      removeListener = () => {
        _$.removeListener(listener)
      }
    })

    expect(handler).not.toHaveBeenCalled()

    setTimeout(() => {
      expect(handler).toHaveBeenCalledTimes(4)
      removeListener()
      setTimeout(() => {
        expect(doneHandler).toHaveBeenCalledTimes(1)
        done()
      }, 500)
    }, 3500)
  })
})
