import { createEventType, useStream } from '@bara/core'
import { EventEmitter } from 'fbemitter'
import immer from 'immer'

export interface BarnState {
  [k: string]: any
}

export const SET_BARN_STATE = createEventType('SET_BARN_STATE')

export const useBarnStream = (initialState: BarnState) => {
  const emitter = new EventEmitter()

  const setBarnState = (data: any) => {
    emitter.emit(SET_BARN_STATE(), data)
  }

  let state = { ...initialState }

  useStream<BarnState>(({ emit, setName, setMemory, addEventType }) => {
    setName('dev.barajs.barn')
    setMemory(true)
    addEventType(SET_BARN_STATE)

    const setStateListener = emitter.addListener(
      SET_BARN_STATE(),
      (data: any) => {
        state = immer(state, draft => {
          draft = { ...draft, ...data }
        })
        emit(SET_BARN_STATE, state)
      },
    )

    return () => {
      emitter.removeAllListeners()
    }
  })

  return [setBarnState]
}

export const useBarn = <T>(state: BarnState) => {
  useBarnStream(state)
}
