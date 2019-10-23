import { StreamPayload } from '../stream'
import { ActChain, ChainType } from './type'

export type ActPayload = (payload: StreamPayload) => any

export const pipeChain = (...actions: ActPayload[]): ActChain => {
  return {
    type: ChainType.act,
    func: (payload: StreamPayload) => payload,
    link: (parent, linker) => {
      let nextStream = parent
      for (const action of actions) {
        const nextMap = linker.getRealAction(action)
        nextStream = nextStream.map(nextMap)
      }
      return nextStream
    },
  }
}
