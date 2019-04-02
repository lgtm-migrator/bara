import xs from 'xstream'

import { generateName } from './helpers/string'
import { AppStream } from './model/app'
import { BaraEvent, EventType } from './model/event'
import { BaraStreamConfig } from './model/stream'
import { BaraTriggerConfig, BaraTriggerSetup } from './model/trigger'

import { useEventHook } from './hooks/use-event'
import { useStreamHook } from './hooks/use-stream'
import { useTriggerHook } from './hooks/use-trigger'

const generateTriggerName = (index: number) =>
  generateName('TRIGGER', () => `${index}`)

const bara = (() => {
  let appStream: AppStream<any> = xs.never()
  const streamRegistry: any[] = []
  let streamRegistryIndex = 0
  const triggerRegistry: any[] = []
  let triggerRegistryIndex = 0
  const triggerConfig: Array<BaraTriggerConfig<any>> = []
  let triggerConfigIndex = 0

  return {
    register(app: () => void) {
      app()
      // Register all triggers
      return { streamRegistry, triggerRegistry }
    },
    useStream<T>(streamConfig: BaraStreamConfig<T>) {
      streamRegistry[streamRegistryIndex] =
        streamRegistry[streamRegistryIndex] ||
        (useStreamHook(streamConfig) as any)
      appStream = xs.merge(appStream, streamRegistry[streamRegistryIndex]
        ._$ as AppStream<any>)
      streamRegistryIndex = streamRegistryIndex + 1
      return streamRegistry
    },
    useTrigger<T>(setup: BaraTriggerSetup<T>) {
      const config: BaraTriggerConfig<T> = {
        name: generateTriggerName(triggerConfigIndex),
        event: null,
      }

      // Setup trigger config
      triggerConfig[triggerConfigIndex] =
        triggerConfig[triggerConfigIndex] || config
      const [eventSetup] = setup() // Execute user defined trigger setup function which will assign to the current triggerConfig

      // Done the setup by skip to the next trigger
      triggerConfigIndex += 1

      // Setup real trigger
      const currentTrigger =
        triggerRegistry[triggerRegistryIndex] ||
        (useTriggerHook(config, triggerRegistryIndex) as any)

      let event: BaraEvent<T>
      // let condition: any // TODO attach condition
      // let action: any // TODO attach action

      // Attach BaraEvent with current BaraTrigger
      if (!('event' in currentTrigger)) {
        if (typeof eventSetup === 'function') {
          event = eventSetup(appStream)
          if (event && event._$) {
            currentTrigger.event = event
            event._$.addListener({
              next: data => console.log(data),
            })
            console.log(`[BaraEvent] Registered event ${event.name}`)
          }
        } else {
          throw new Error(
            `Trigger function have to return an array with the first value is an BaraEvent`,
          )
        }
      }
      triggerRegistryIndex = triggerRegistryIndex + 1

      return triggerRegistry
    },
    useEvent<T>(eventType: EventType) {
      const currentTriggerConfig = triggerConfig[triggerConfigIndex]
      if (!currentTriggerConfig) {
        throw new Error(
          `No trigger is registering at this time. 'useEvent' can only being used in a Bara Trigger.`,
        )
      }
      const event = useEventHook<T>(currentTriggerConfig, eventType)
      return event
    },
  }
})()

const { register, useStream, useTrigger, useEvent } = bara

export { register, useStream, useTrigger, useEvent }
