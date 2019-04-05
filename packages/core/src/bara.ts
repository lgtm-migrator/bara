import xs from 'xstream'

import { generateName } from './helpers/string'
import {
  BaraAction,
  BaraCallbackActionConfig,
  BaraNormalActionConfig,
} from './model/action'
import { AppStream } from './model/app'
import { BaraConditionConfig } from './model/condition'
import { BaraEvent, EventType } from './model/event'
import { BaraStreamConfig } from './model/stream'
import {
  BaraTriggerConfig,
  BaraTriggerSetup,
  TriggerEntityType,
} from './model/trigger'

import { useCallbackActionHook, useNormalActionHook } from './hooks/use-action'
import { useConditionHook } from './hooks/use-condition'
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
      const {
        event: eventSetup,
        condition: conditionSetup,
        action: actionSetup,
      } = setup() // Execute user defined trigger setup function which will assign to the current triggerConfig

      // Done the setup by skip to the next trigger
      triggerConfigIndex += 1

      // Setup real trigger
      const currentTrigger =
        triggerRegistry[triggerRegistryIndex] ||
        (useTriggerHook(config, triggerRegistryIndex) as any)

      // Attach BaraEvent, BaraCondition, BaraAction with current BaraTrigger
      const event = currentTrigger.attach(TriggerEntityType.EVENT, eventSetup, [
        appStream,
      ])
      const condition = currentTrigger.attach(
        TriggerEntityType.CONDITION,
        conditionSetup,
        [],
      )
      const action = currentTrigger.attach(
        TriggerEntityType.ACTION,
        actionSetup,
        [event, condition],
      ) // TODO replace event with condition or add condition too

      // Done trigger registering step and skip to next useTrigger function
      triggerRegistryIndex = triggerRegistryIndex + 1

      return currentTrigger
    },
    useEvent<T>(eventType: EventType) {
      const currentTriggerConfig = triggerConfig[triggerConfigIndex]
      if (!currentTriggerConfig) {
        throw new Error(
          `No trigger is registering at this time. 'useEvent' can only being used in a Bara Trigger.`,
        )
      }
      const eventSetup = useEventHook<T>(currentTriggerConfig, eventType)
      return eventSetup
    },
    useCondition<T>(config: BaraConditionConfig<T>) {
      const conditionSetup = useConditionHook<T>(config)
      return conditionSetup
    },
    useAction<T>(callback: BaraNormalActionConfig<T>) {
      const actionSetup = useNormalActionHook(callback)
      return actionSetup
    },
  }
})()

const {
  register,
  useStream,
  useTrigger,
  useEvent,
  useAction,
  useCondition,
} = bara

export { register, useStream, useTrigger, useEvent, useAction, useCondition }
