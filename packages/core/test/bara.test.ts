import {
  createEventType,
  EventType,
  register,
  SetupCallbacks,
  useAction,
  useCondition,
  useEvent,
  useStream,
  useTrigger,
} from '../src'

describe('bara application', () => {
  it('run full bara application', done => {
    const syncActionResultCallback = jest.fn()
    const asyncActionResultCallback = jest.fn()
    const name = 'Example String Stream'
    const newStringEvent = createEventType<string>('NEW_STRING')
    const setup = ({ emit }: SetupCallbacks<string>) => {
      setTimeout(() => {
        emit(newStringEvent, 'Hello Bara App!')
        emit(newStringEvent, 'Hello X App!')
      }, 1000)
    }

    const baraApp = () => {
      // Any Bara application should start with a Stream
      useStream<string>({
        name,
        setup,
        eventTypes: [newStringEvent],
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
        eventType: 'trigger-0-new-string',
        payload: 'Hello Bara App!',
      })

      expect(asyncActionResultCallback).toHaveBeenCalledTimes(1)
      expect(asyncActionResultCallback).toHaveBeenCalledWith('Hello X App!', {
        eventType: 'trigger-1-new-string',
        payload: 'Hello X App!',
      })
      done()
    }, 2000)
  })
})
