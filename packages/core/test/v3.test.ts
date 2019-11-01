import { EventEmitter } from 'events'
import { act, app, flow, popEvent, portion, run, withContext } from '../src'

const Emitter1 = portion<any, EventEmitter, any>({
  name: 'bara-emitter-1',
  init: () => {
    const emitter = new EventEmitter()
    return emitter
  },
  whenInitialized: flow<void, EventEmitter, any>({
    bootstrap: ({ next }) => {
      next()
    },
  }),
})

const Emitter2 = portion<any, EventEmitter, any>({
  name: 'bara-emitter-2',
  init: () => {
    const emitter = new EventEmitter()
    return emitter
  },
  whenInitialized: flow<void, EventEmitter, any>({
    bootstrap: ({ next }) => {
      next()
    },
  }),
  whenEventEmitted: flow<any, EventEmitter, any>({
    bootstrap: ({ context, next }) => {
      context.on('-', next)
    },
  }),
})

const { whenInitialized: whenE1Ready } = popEvent(Emitter1)
const { whenInitialized: whenE2Ready, whenEventEmitted } = popEvent(Emitter2)

run(
  app({
    portion: [Emitter1(), Emitter2()],
    trigger: [
      whenE1Ready(
        withContext(
          act((_: any, [emitter2]) => {
            ;(emitter2 as EventEmitter).emit('-', 'Hello')
            // console.log('E1 Ready', emitter2)
          }),
          Emitter2,
        ),
      ),
      // whenE2Ready(act(() => console.log('E2 Is Ready'))),
      whenEventEmitted(
        act((data: string) => {
          // console.log(`E2 event:`, data)
        }),
      ),
    ],
  }),
)

// const describe = describe || (name, func) => func()

describe('bara core', () => {
  test('it run basic bara application', () => {
    expect(true).toBeTruthy()
  })
})
