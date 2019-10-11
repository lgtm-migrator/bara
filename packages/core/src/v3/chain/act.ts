import { StreamPayload } from '../stream'
import { Chain, ChainType } from './type'

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
