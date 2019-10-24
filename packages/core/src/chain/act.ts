import { StreamPayload } from '../stream'
import { ActChain, ChainType } from './type'

export type ActPayload = (payload: StreamPayload) => any

export const act = (action: ActPayload | ActPayload[]): ActChain => {
  return {
    type: ChainType.act,
    func: (payload: StreamPayload) => {
      if (typeof action === 'function') {
        action(payload)
      } else {
        if (action.length) {
          ;(action as ActPayload[]).map(a => a(payload))
        }
      }
    },
    link: parent => {
      return parent
    },
  }
}
