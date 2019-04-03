import xs, { Stream } from 'xstream'

import { generateName } from '../helpers/string'

import { AppStream } from '../model/app'
import { Use } from '../model/base'
import { BaraEvent, EventType } from '../model/event'
import { BaraStream, BaraStreamPayload } from '../model/stream'
import { BaraTrigger, BaraTriggerConfig } from '../model/trigger'

const generateEventName = (name: string) => generateName('EVENT', () => name)

export type UseEventHookType<T> = (appStream: AppStream<T>) => BaraEvent<T>

export function useEventHook<T>(
  trigger: BaraTriggerConfig<T>,
  eventTypeRegister: EventType,
): UseEventHookType<T> {
  return (appStream: AppStream<T>) => {
    const name = generateEventName(trigger.name!)
    const eventFilter = (streamPayload: BaraStreamPayload<T>) => {
      return streamPayload.eventType(trigger) === eventTypeRegister(trigger)
    }
    const _$ = (appStream as AppStream<T>)
      .filter(eventFilter)
      .map(({ eventType: evenTypeRegFunc, payload }) => {
        const eventType = evenTypeRegFunc(trigger)
        return { eventType, payload }
      })
    return { name, _$ }
  }
}
