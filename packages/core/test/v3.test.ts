import {
  run,
  app,
  stream,
  flow,
  fromContext,
  razeEvent,
  razeCondition,
  portion,
} from '../src/v3'
import { EventEmitter } from 'events'

interface TikTokMold {
  periodic: number
}

describe('bara core', () => {
  test('it run basic bara application', () => {
    const TikTok = portion<number, EventEmitter, TikTokMold>({
      mold: { periodic: 0 },
      init: ({ periodic }) => {
        const emitter = new EventEmitter()
        let i = 0
        setInterval(() => {
          if (i === 0) {
            emitter.emit('start') // Simulate the start event
          }
          emitter.emit('second', i) // Simulate the event emitting every second
          i += 1
        }, periodic)
        return stream({
          source: fromContext(emitter),
          context: emitter,
        })
      },
      flow: {
        whenStart: flow({
          func: (context, next) => {
            context.addListener('start', (startData: any) => {
              next(startData)
            })
          },
        }),
        whenSecond: flow({
          func: (context, next) => {
            context.addListener('second', (startData: any) => {
              next(startData)
            })
          },
          seep: {
            isEven: (second: number) => second % 2 === 0,
            isOdd: (second: number) => second % 2 === 0,
          },
        }),
      },
    })

    const { whenStart, whenSecond } = razeEvent(TikTok)
    const { isEven } = razeCondition(TikTok)

    const handleTikTokStart = jest.fn()
    const handleTikTokSecond = jest.fn()

    const consoleWhenTikTokStart = whenStart(handleTikTokStart)
    const consoleWhenTikEven = whenSecond(isEven)(handleTikTokSecond)

    const App = app({
      portion: [TikTok({ periodic: 3000 })],
      trigger: [consoleWhenTikTokStart, consoleWhenTikEven],
    })
    expect(run(App)).not.toBeFalsy()
  })
})
