import {
  addDebugListener,
  createEventType,
  register,
  useAction,
  useEvent,
  useStream,
  useTrigger,
} from '../src'

describe('use debugger', () => {
  it('should attach console log to main app stream', done => {
    jest.setTimeout(6000)
    const handler = jest.fn()
    const handlerReal = jest.fn()
    const handlerNotFoundStream = jest.fn()
    const handlerSpecificStream = jest.fn()

    register(() => {
      const SAMPLE_EVENT = createEventType('SAMPLE_EVENT')
      const STREAM_ID = 'dev.barajs.debugger'
      useStream<number>(({ setName, addEventType, emit }) => {
        setName(STREAM_ID)
        addEventType(SAMPLE_EVENT)

        let counter = 0
        const timer = setInterval(() => {
          emit(SAMPLE_EVENT, counter)
          counter += 1
          if (counter > 9) {
            clearInterval(timer)
          }
        }, 500)

        return () => {
          clearInterval(timer)
        }
      })

      // tslint:disable-next-line
      addDebugListener('app', (data: any) => {
        handler(data)
      })

      // Add specific stream debugger by attaching to its name
      addDebugListener(STREAM_ID, handlerSpecificStream)

      // Add not found stream and expect a handling error
      expect(() => {
        addDebugListener(STREAM_ID + '-diff', handlerNotFoundStream)
      }).toThrow(
        `[Bara Debugger] Not found any stream registered with name ${STREAM_ID}-diff. You can specify stream 'app' for all stream event.`,
      )

      useTrigger(() => {
        const event = useEvent(SAMPLE_EVENT)
        const action = useAction(handlerReal)
        return { event, action }
      })
    })

    setTimeout(() => {
      expect(handler).toHaveBeenCalledTimes(10)
      expect(handlerSpecificStream).toHaveBeenCalledTimes(10)
      expect(handlerNotFoundStream).not.toHaveBeenCalled()
      expect(handler).toHaveBeenCalled()
      done()
    }, 5200)
  })
})
