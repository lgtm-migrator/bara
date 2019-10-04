import { Chain, ChainType } from './type'
import { StreamPayload } from '../stream'

export type ActPayload = (payload: StreamPayload) => any

export interface ActChain extends Chain {}

export const act = (payload: ActPayload): ActChain => {
  return {
    type: ChainType.act,
    func: payload,
  }
}
