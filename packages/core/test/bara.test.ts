import {
  createEventType,
  EventType,
  register,
  SetupCallbacks,
  useAction,
  useEvent,
  useStream,
  useTrigger,
} from '../src'

describe('main bara application', () => {
  it('run full bara application', done => {
    const name = 'Example Stream'
    const newStringEvent = createEventType<string>('NEW_STRING')
    const setup = ({ emit }: SetupCallbacks<string>) => {
      setTimeout(() => {
        emit(newStringEvent, 'Hello Bara App!')
      }, 1000)
    }

    const baraApp = () => {
      // Any Bara application should start with a Stream
      useStream<string>({
        name,
        setup,
        eventTypes: [newStringEvent],
      })

      useTrigger<string>(() => {
        const event = useEvent<string>(newStringEvent)
        const action = useAction<string>((data, payload) => {
          console.log(`Action value: ${data} - ${JSON.stringify(payload)}`)
        })
        return {event, action}
      })
    }
    const { streamRegistry, triggerRegistry } = register(baraApp)
    setTimeout(() => {
      done()
    }, 2000)
  })
})
