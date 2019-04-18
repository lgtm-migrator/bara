import { createEventType, register, setupEmitter } from '../src'

describe('@bara/core emitter', () => {
  it('create external emitter and map with bara app', () => {
    const handler = jest.fn()

    const SampleType = createEventType('SAMPLE_TYPE')
    const SimpleType = createEventType('SIMPLE_TYPE')
    register(() => {
      const emitter = setupEmitter(({ setName, addEventType }) => {
        setName('dev.barajs.emitter.sample')
      })
      expect(emitter).toHaveProperty('_$')
      expect(emitter).toHaveProperty('name')
    })
  })
})
