import xs, { Listener } from 'xstream'

import { EventType } from '../model/event'
import {
  BaraStream,
  BaraStreamCleanup,
  BaraStreamConfig,
  BaraStreamParams,
  BaraStreamPayload,
  BaraStreamSetup,
  SetupCallbacks,
} from '../model/stream'

import { getBaraName } from '../helpers/string'

const dummyFunc = (...args: any[]) => undefined

export function useStreamHook<T>(
  setup: BaraStreamSetup<T>,
  index: number,
): BaraStream<T> {
  const config: BaraStreamConfig<T> = { name: '', eventTypes: [] }

  const params: BaraStreamParams<T> = {
    setName: (name: string) => {
      config.name = getBaraName(name || `stream-${index}`)
    },
    addEventType: eventType => {
      config.eventTypes = [...config.eventTypes, eventType]
    },
    addEventTypes: eventTypes => {
      // TODO Make type check before override to config
      config.eventTypes = eventTypes
    },
    // Dummy functions, will be patched below
    emit: dummyFunc,
  }

  // Ensure stream's name always assigned
  if (!config.name) {
    params.setName(config.name)
  }

  const emitter = (listener: Listener<BaraStreamPayload<T>>) => (
    eventType: EventType,
    value?: T,
  ) => {
    const name = config.name
    listener.next({
      eventType: eventType({ name }),
      payload: value || null,
      streamName: name,
    })
  }

  const producer = {
    start: (listener: Listener<BaraStreamPayload<T>>) => {
      const emit = emitter(listener)
      // Patch params with this stream to emit new value
      params.emit = emit
    },
    stop: () => {
      if (typeof cleanup === 'function') {
        ;(cleanup as BaraStreamCleanup)()
      }
    },
  }

  const _$ = xs.create<BaraStreamPayload<T>>(producer)

  // Create dummy listener to make the stream to start
  const dummyListener = {
    next: dummyFunc,
    complete: dummyFunc,
  }
  _$.addListener(dummyListener)

  const cleanup = setup(params)

  _$.removeListener(dummyListener)

  // Patch the stream clean up .stop function
  producer.stop = cleanup as typeof dummyFunc

  return { _$, config, name: config.name }
}
