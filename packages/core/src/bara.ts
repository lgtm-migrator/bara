import { BaraEvent, EventType } from './model/event'
import { BaraStreamConfig } from './model/stream'

import { useEventHook } from './hooks/use-event'
import { useStreamHook } from './hooks/use-stream'
import { BaraTriggerConfig, useTriggerHook } from './hooks/use-trigger'

interface EventMapCache {
  [k: string]: Array<BaraEvent<any>>
}

const bara = (() => {
  const streamRegistry: any[] = []
  let streamRegistryIndex = 0
  const triggerRegistry: any[] = []
  let triggerRegistryIndex = 0
  const eventMaps: EventMapCache = {} // Temporary cache for initial register

  return {
    register(app: () => void) {
      app()
      // Register all triggers
    },
    useStream<T>(streamConfig: BaraStreamConfig<T>) {
      streamRegistry[streamRegistryIndex] =
        streamRegistry[streamRegistryIndex] ||
        (useStreamHook(streamConfig) as any)
      streamRegistryIndex = streamRegistryIndex + 1
      return streamRegistry
    },
    useTrigger<T>(triggerConfig: BaraTriggerConfig<T>) {
      const currentTrigger =
        triggerRegistry[triggerRegistryIndex] ||
        (useTriggerHook(triggerConfig, triggerRegistryIndex) as any)
      triggerRegistryIndex = triggerRegistryIndex + 1
      return triggerRegistry
    },
    useEvent<T>(eventType: EventType) {
      const currentUpStream = streamRegistry[streamRegistryIndex]
      const currentTrigger = triggerRegistry[triggerRegistryIndex]
      if (currentTrigger && currentUpStream) {
        const event = useEventHook<T>(
          currentUpStream,
          currentTrigger,
          eventType,
        )
        if (!('event' in currentTrigger)) {
          currentTrigger.event = event
        }
      } else {
        throw new Error(
          `No trigger is registering at this time. 'useEvent' can only being used in a Bara Trigger.`,
        )
      }
      const hook = useEventHook
    },
  }
})()

const { register, useStream } = bara

export { register, useStream }
