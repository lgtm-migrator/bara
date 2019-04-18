import xs, { Listener } from 'xstream'
import { EventType } from './model/event'

export function createExternalEmitter(eventTypes: EventType[]) {
  const emitter$ = xs.never()

  const emitFuncs = eventTypes.map(eventType => {
    const emitFunc = (payload?: any) => {
      emitter$.shamefullySendNext({ eventType: eventType(), payload })
    }
    return emitFunc
  })

  return [emitter$, ...emitFuncs]
}
