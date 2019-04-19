import xs from 'xstream'

import {
  AppStream,
  BaraEmitter,
  BaraEmitterConfig,
  BaraEmitterFunc,
  BaraEmitterFuncRecord,
  BaraEmitterParams,
  BaraEmitterPayload,
  BaraEmitterSetup,
  EventType,
} from './model'

import { getBaraName } from './helpers/string'

export const createEmitterHook = <T>(
  setup: BaraEmitterSetup<T>,
  index: number = 0,
): BaraEmitter<T> => {
  const config: BaraEmitterConfig<T> = { name: '', eventTypes: [] }

  const params: BaraEmitterParams<T> = {
    setName: (name: string) => {
      config.name = getBaraName(`emitter.${name ? name : index}`)
    },
    addEventType: eventType => {
      config.eventTypes.push(eventType)
    },
  }

  setup(params)

  const emitter$ = xs.never()

  const emitFuncs: BaraEmitterFuncRecord[] = config.eventTypes.map(
    userEventType => {
      const eventType = userEventType()
      const emitFunc: BaraEmitterFunc = (payload?: any) => {
        emitter$.shamefullySendNext({
          eventType: `${config.name}.${eventType}`,
          payload,
        })
      }
      return [eventType, emitFunc] as BaraEmitterFuncRecord
    },
  )

  const addListener = (
    userEventType: EventType,
    callback: (data: any, payload: any) => void,
  ) => {
    const listener = {
      next: (payload: any) => {
        if (typeof userEventType !== 'function') {
          throw new Error(
            `Please specify first parameter of addListener is a function of type EventType of 'bara' package`,
          )
        }
        const eventType = userEventType()
        if (
          (payload as BaraEmitterPayload<T>).eventType ===
          `${config.name}.${eventType}`
        ) {
          callback(payload.payload, payload)
        }
      },
    }
    emitter$.addListener(listener)
    return {
      remove: () => {
        emitter$.removeListener(listener)
      },
    }
  }

  return { name: config.name, _$: emitter$, emitFuncs, addListener }
}
