import { BaraEventPayload, BaraStreamPayload } from '@bara/core'

export type ConditionPipeFunction<T> = (
  triggeringEvent: T,
  payload?: BaraEventPayload<T> | BaraStreamPayload<T>,
) => Promise<boolean> | boolean

export type ConditionAndFunction<T> = (
  ...conditions: Array<ConditionPipeFunction<T>>
) => Promise<boolean> | boolean

export type ConditionOrFunction<T> = ConditionAndFunction<T>

export type ConditionPipe<T> =
  | ConditionPipeFunction<T>
  | ConditionAndFunction<T>
  | ConditionOrFunction<T>

export type PayloadPipe<T> = BaraEventPayload<T> | BaraStreamPayload<T>

export type ActionPipe<T> = (
  data: T,
  payload?: PayloadPipe<T>,
) => Promise<any> | any | undefined | void

export type BaraPipeHook<T> = (
  ...conditions: Array<ConditionPipe<T>>
) => (...actions: Array<ActionPipe<T>>) => Promise<void>
