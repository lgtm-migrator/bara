import { register, useStream } from '../src/bara'

describe('main bara application', () => {
  beforeAll(() => {
    register(() => {
      const registry = useStream({
        name: 'example-stream',
        eventTypes: [],
        setup: ({ emit }) => {
          setTimeout(() => {
            emit!('not_an_event', {})
          }, 1000)
        },
      })
    })
  })
  it('run bara application', () => {
    expect(true).toBeTruthy()
  })
})
