import { Chain, ChainType } from './type'
import { StreamPayload } from '../stream'

export type ActPayload = (payload: StreamPayload) => any

export interface ActChain extends Chain {}

export const act = (action: ActPayload): ActChain => {
  return {
    type: ChainType.act,
    func: (payload: StreamPayload) => {
      action(payload)
    },
  }
}
