import {
  createEmitter,
  createEventType,
  register,
  useAction,
  useEmitter,
  useEvent,
  useStream,
  useTrigger,
} from '../src'

describe('@bara/core emitter', () => {
  it('create external emitter and map with bara app', done => {
    const handler = jest.fn()

    const SampleType = createEventType('SAMPLE_TYPE')
    const SimpleType = createEventType('SIMPLE_TYPE')

    const { emitterMap } = register(() => {
      const emitter = createEmitter(({ setName, addEventType }) => {
        setName('dev.barajs.emitter.sample')
        addEventType(SampleType)
        addEventType(SimpleType)
      })
      expect(emitter).toHaveProperty('_$')
      expect(emitter).toHaveProperty('name')
      expect(emitter).toHaveProperty('emitFuncs')
      expect(emitter).toHaveProperty('addListener')
      expect(emitter.emitFuncs).toHaveLength(2)

      const emitSampleType = useEmitter(SampleType)
      expect(emitSampleType).not.toEqual(null)

      useStream<number>(({ emit, setName, addEventType }) => {
        setName('dev.barajs.sample')

        const timer = setTimeout(() => {
          emit(SampleType, 1)
        }, 1000)

        const listener = emitter.addListener(SimpleType, (payload: any) => {
          emit(SimpleType, payload)
        })

        return () => {
          clearTimeout(timer)
          listener.remove()
        }
      })

      useTrigger(() => {
        const event = useEvent(SampleType)
        const emitSimple = useEmitter(SimpleType)
        const action = useAction(data => {
          emitSimple!(3)
        })
        return { event, action }
      })

      useTrigger(() => {
        const event = useEvent(SimpleType)
        const action = useAction(data => {
          expect(data).toEqual(3)
        })
        return { event, action }
      })
    })

    setTimeout(() => {
      expect(emitterMap).toHaveProperty(SampleType())
      done()
    }, 2000)
  })
})
