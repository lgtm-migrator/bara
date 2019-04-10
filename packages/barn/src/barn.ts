import {
  createEventType,
  useAction,
  useCondition,
  useCustomEvent,
  useStream,
  useTrigger,
} from '@bara/core'
import dotProp from 'dot-prop'
import { EventEmitter } from 'fbemitter'
import xs, { Listener, Stream } from 'xstream'

export interface BarnState {
  [k: string]: any
}

export const SET_STATE = createEventType('SET_STATE')

export const useBarnStream = (initialState: BarnState) => {
  const methods = {
    // Dummy next function
    next: (...args: any[]) => {
      return
    },
  }

  const nextFunc = (listener: Listener<BarnState>) => (value: any) => {
    listener.next(value)
  }

  const barn$ = xs.createWithMemory({
    start: listener => {
      const next = nextFunc(listener)
      methods.next = next
    },
    stop: () => {
      return
    },
  })

  barn$.addListener({
    next: value => {
      return value
    },
  })

  const setState = (path: string, data: any) => {
    methods.next({ path, data })
  }

  let state = { ...initialState }

  useStream<BarnState>(({ emit, setName, setMemory, addEventType }) => {
    setName('dev.barajs.barn')
    setMemory(true)
    addEventType(SET_STATE)

    const barnListener = {
      next: ({ path, data }: any) => {
        state = dotProp.set(state, path, data)
        emit(SET_STATE, { path, state })
      },
    }
    barn$.addListener(barnListener)

    return () => {
      barn$.removeListener(barnListener)
    }
  })

  return [setState]
}

export const useBarn = (key: string, callback: (...args: any[]) => void) => {
  return useTrigger<BarnState>(() => {
    const event = useCustomEvent<BarnState>(SET_STATE, (streamPayload: any) => {
      const eventPath = streamPayload.payload.path
      return eventPath === key
    })
    const action = useAction((data: any, payload: any) => {
      const scopedState = dotProp.get(data.state, key)
      callback(scopedState, payload)
    })
    return { event, action }
  })
}
