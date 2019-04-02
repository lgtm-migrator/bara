import xs from 'xstream'
import { slugify } from '../helpers/string'
import { Use } from '../model/base'
import { BaraEvent, EventType } from '../model/event'
import { BaraStream, BaraStreamPayload } from '../model/stream'
import { BaraTrigger } from '../model/trigger'

export type UseEventHookType<T> = (
  eventPayload: BaraStreamPayload<T>,
) => BaraEvent<T>

export function useEventHook<T>(
  upStream: BaraStream<T>,
  trigger: BaraTrigger<T>,
  eventTypeRegister: EventType,
): BaraEvent<T> {
  const name = slugify(trigger.name)
  const eventFilter = (streamPayload: BaraStreamPayload<T>) => {
    return streamPayload.eventType === eventTypeRegister(trigger)
  }
  const __$ = upStream._$.filter(eventFilter)
  return { name, __$, _$: upStream }
}
