import {
  createEmitter,
  createEventType,
  Listener,
  Stream,
  useAction,
  useCondition,
  useCustomEvent,
  useEmitter,
  useStream,
  useTrigger,
  xs,
} from '@bara/core'
import dotProp from 'dot-prop'

export interface BarnState {
  [k: string]: any
}

export const SET_BARN_STATE = createEventType('SET_BARN_STATE')

export const useBarnStream = (initialState: BarnState) => {
  const emitter = createEmitter(({ setName, addEventType }) => {
    setName('dev.barajs.barn.emitter')
    addEventType(SET_BARN_STATE)
  })

  let state = { ...initialState }

  return useStream<BarnState>(({ emit, setName, setMemory, addEventType }) => {
    setName('dev.barajs.barn')
    setMemory(true)
    addEventType(SET_BARN_STATE)

    const onNewState = emitter.addListener(
      SET_BARN_STATE,
      ({ path, data }: any) => {
        state = dotProp.set(state, path, data)
        emit(SET_BARN_STATE, { path, state })
      },
    )

    return () => {
      onNewState.remove()
    }
  })
}

export const setBarnState = (path: string, data: any) => {
  const mutate = useEmitter(SET_BARN_STATE)
  if (mutate !== null) {
    mutate!({ path, data })
  } else {
    throw new Error(
      `Please register 'userBarnStream' in 'register' function before calling setBarnState!`,
    )
  }
}

export const useBarn = (key: string, callback: (...args: any[]) => void) => {
  return useTrigger<BarnState>(() => {
    const event = useCustomEvent<BarnState>(
      SET_BARN_STATE,
      (streamPayload: any) => {
        const eventPath = streamPayload.payload.path
        return eventPath === key
      },
    )
    const action = useAction((data: any, payload: any) => {
      const scopedState = dotProp.get(data.state, key)
      callback(scopedState, payload)
    })
    return { event, action }
  })
}
