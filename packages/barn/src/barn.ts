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
export const BARN_INITIALIZE = createEventType('BARN_INITIALIZE')
export const BASICS_STREAM_ID = 'dev.barajs.barn'

export const useBarnStream = (initialState: BarnState) => {
  const emitter = createEmitter(({ setName, addEventType }) => {
    setName('dev.barajs.barn.emitter')
    addEventType(SET_BARN_STATE)
    addEventType(BARN_INITIALIZE)
  })

  let state = { ...initialState }

  const barn$ = useStream<BarnState>(
    ({ emit, setName, setMemory, addEventType }) => {
      setName(BASICS_STREAM_ID)
      setMemory(true)
      addEventType(SET_BARN_STATE)

      const onNewState = emitter.addListener(
        SET_BARN_STATE,
        ({ path, data }: any) => {
          state = dotProp.set(state, path, data)
          emit(SET_BARN_STATE, { path, state })
        },
      )

      const onInitialized = emitter.addListener(BARN_INITIALIZE, () => {
        state = initialState
        emit(SET_BARN_STATE, { path: '', state })
      })

      return () => {
        onNewState.remove()
        onInitialized.remove()
      }
    },
  )

  // Emit initialize value to the barn's MemoryStream to making it able to use whenever new listener come.
  setTimeout(() => {
    const emit = useEmitter(BARN_INITIALIZE)
    if (emit) {
      emit()
    }
  })

  return barn$
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
        const isExisted = Boolean(dotProp.get(streamPayload.payload.state, key))
        return (
          isExisted || (!isExisted && eventPath === '' && eventPath === key)
        )
      },
    )
    const action = useAction((data: any, payload: any) => {
      const scopedState =
        key === ''
          ? payload.payload.state
          : dotProp.get(payload.payload.state, key)
      callback(scopedState, payload)
    })
    return { event, action }
  })
}
