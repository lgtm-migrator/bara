import {
  createEventType,
  EventType,
  register,
  useAction,
  useCondition,
  useEvent,
  useStream,
  useTrigger,
} from '../src'

describe('bara application', () => {
  it('run full bara application', done => {
    jest.setTimeout(5000)
    const syncActionResultCallback = jest.fn()
    const asyncActionResultCallback = jest.fn()
    const name = 'Example String' // Will be normalize to "dev.barajs.example-string"
    const newStringEvent = createEventType<string>('NEW_STRING') // Will create "dev.barajs.example-string.new-string"
    const newBornEvent = createEventType<number>('NEW_BORN')

    const baraApp = () => {
      // Any Bara application should start with a Stream
      const stream = useStream<string>(({ setName, emit, addEventType }) => {
        setName(name)
        addEventType(newStringEvent)

        const timer = setTimeout(() => {
          emit(newStringEvent, 'Hello Bara App!')
          emit(newStringEvent, 'Hello X App!')
        }, 1000)

        return () => {
          clearTimeout(timer)
        }
      })

      // Different stream to test for single source events
      useStream<number>(({ emit, setName, addEventType }) => {
        setName('tld.example.gospel')
        addEventType(newBornEvent)

        const timer = setTimeout(() => {
          emit(newBornEvent, 1)
        }, 1500)

        return () => {
          clearTimeout(timer)
        }
      })

      // Test Trigger with synchronous condition
      useTrigger<string>(() => {
        const event = useEvent<string>(newStringEvent)
        const condition = useCondition<string>(data => {
          return data === 'Hello Bara App!'
        })
        const action = useAction<string>(syncActionResultCallback)
        return { event, condition, action }
      })

      // Test Trigger with asynchronouse condition
      useTrigger<string>(() => {
        const event = useEvent<string>(newStringEvent)

        const condition = useCondition<string>(data => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              if (data === 'Hello X App!') {
                resolve(true)
              } else {
                reject()
              }
            }, 500)
          })
        })

        const action = useAction<string>(asyncActionResultCallback)
        return { event, condition, action }
      })
    }

    const { streamRegistry, triggerRegistry } = register(baraApp)
    setTimeout(() => {
      expect(syncActionResultCallback).toHaveBeenCalledTimes(1)
      expect(syncActionResultCallback).toHaveBeenCalledWith('Hello Bara App!', {
        eventType: 'dev.barajs.example-string.new-string',
        payload: 'Hello Bara App!',
      })

      expect(asyncActionResultCallback).toHaveBeenCalledTimes(1)
      expect(asyncActionResultCallback).toHaveBeenCalledWith('Hello X App!', {
        eventType: 'dev.barajs.example-string.new-string',
        payload: 'Hello X App!',
      })
      done()
    }, 2000)
  })
})
