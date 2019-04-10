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
import xs, { Listener, Stream } from 'xstream'

export interface BarnState {
  [k: string]: any
}

export const SET_STATE = createEventType('SET_STATE')

export const useBarnStream = (initialState: BarnState) => {
  const methods = {
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

  const setState = (data: any) => {
    methods.next(data)
  }

  let state = { ...initialState }

  useStream<BarnState>(({ emit, setName, setMemory, addEventType }) => {
    setName('dev.barajs.barn')
    setMemory(true)
    addEventType(SET_STATE)

    const barnListener = {
      next: (data: any) => {
        state = immer(state, draft => {
          for (const prop in data) {
            if (prop in draft) {
              draft[prop] = data[prop]
            }
          }
        })
        emit(SET_STATE, state)
      },
    }
    barn$.addListener(barnListener)

    return () => {
      barn$.removeListener(barnListener)
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
