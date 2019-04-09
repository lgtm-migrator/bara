import {
  createEventType,
  useAction,
  useCondition,
  useEvent,
  useStream,
  useTrigger,
} from '@bara/core'
import { EventEmitter } from 'fbemitter'
import immer from 'immer'

export interface BarnState {
  [k: string]: any
}

export const SET_STATE = createEventType('SET_STATE')

export const useBarnStream = (initialState: BarnState) => {
  const emitter = new EventEmitter()

  const setState = (data: any) => {
    emitter.emit(SET_STATE(), data)
  }

  let state = { ...initialState }

  useStream<BarnState>(({ emit, setName, setMemory, addEventType }) => {
    setName('dev.barajs.barn')
    setMemory(true)
    addEventType(SET_STATE)

    const setStateListener = emitter.addListener(SET_STATE(), (data: any) => {
      state = immer(state, draft => {
        for (const prop in data) {
          if (prop in draft) {
            draft[prop] = data[prop]
          }
        }
      })
      emit(SET_STATE, state)
    })

    return () => {
      emitter.removeAllListeners()
    }
  })

  return [setState]
}

export const useBarn = (key: string, callback: (data: any) => void) => {
  return useTrigger<BarnState>(() => {
    const event = useEvent<BarnState>(SET_STATE)
    const condition = useCondition<BarnState>(data => {
      return data !== undefined && key in data
    })
    const action = useAction(callback)
    return { event, condition, action }
  })
}
