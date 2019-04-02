import { BaraEvent } from '../model/event'
import { BaraStreamPayload } from '../model/stream'

export function useEventHook<T>({ eventType, payload }: BaraStreamPayload<T>) {}
