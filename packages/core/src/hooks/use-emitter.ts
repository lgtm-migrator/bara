import xs from 'xstream'
import {
  AppStream,
  BaraEmitter,
  BaraEmitterConfig,
  BaraEmitterParams,
  BaraEmitterPayload,
  BaraEmitterSetup,
} from '../model'

import { getBaraName } from '../helpers/string'

export type UseEmitterHookType<T> = (appStream: AppStream<T>) => BaraEmitter<T>

export const useEmitterHook = <T>(
  setup: BaraEmitterSetup<T>,
  index: number = 0,
) => {
  return (appStream: AppStream<T>) => {
    const config: BaraEmitterConfig<T> = { name: '', eventTypes: [] }

    const params: BaraEmitterParams<T> = {
      setName: (name: string) => {
        config.name = getBaraName(name + '-emitter')
      },
      addEventType: eventType => {
        config.eventTypes.push(eventType)
      },
    }

    const emitter$ = xs.never()

    const emitFuncs = config.eventTypes.map(eventType => {
      const emitFunc = (payload?: any) => {
        emitter$.shamefullySendNext({ eventType: eventType(), payload })
      }
      return emitFunc
    })

    setup(params)

    return { name, _$: emitter$ }
  }
}
