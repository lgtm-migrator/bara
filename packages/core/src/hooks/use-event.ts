import xs, { Stream } from 'xstream'

import { getBaraName } from '../helpers/string'

import { AppStream } from '../model/app'
import { Use } from '../model/base'
import { BaraEvent, BaraEventPayload, EventType } from '../model/event'
import { BaraStream, BaraStreamPayload } from '../model/stream'
import { BaraTrigger, BaraTriggerConfig } from '../model/trigger'

export type UseEventHookType<T> = (appStream: AppStream<T>) => BaraEvent<T>

export function useEventHook<T>(
  trigger: BaraTriggerConfig<T>,
  eventTypeRegister: EventType,
): UseEventHookType<T> {
  return (appStream: AppStream<T>) => {
    const name = getBaraName(trigger.name!)
    const eventFilter = (streamPayload: BaraStreamPayload<T>) => {
      const partialEventTypeString = eventTypeRegister({ name: '' })
      return streamPayload.eventType.indexOf(partialEventTypeString) > -1
    }
    const _$ = (appStream as AppStream<T>)
      .filter(eventFilter)
      .map(({ eventType, payload, streamName }) => {
        return { eventType, payload }
      })
    return { name, _$: _$ as Stream<BaraEventPayload<T>> }
  }
}
