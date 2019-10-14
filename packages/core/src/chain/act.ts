import { StreamPayload } from '../stream'
import { ActChain, ChainType } from './type'

export type ActPayload = (payload: StreamPayload) => any

export const act = (action: ActPayload): ActChain => {
  return {
    type: ChainType.act,
    func: (payload: StreamPayload) => {
      action(payload)
    },
    link: parent => {
      return parent
    },
  }
}
