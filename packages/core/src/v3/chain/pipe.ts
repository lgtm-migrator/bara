import { StreamPayload } from '../stream'
import { ActChain, ChainType } from './type'
import { VirtualActionConfig } from '../event'

const getAction = (virtualAction: VirtualActionConfig<any>) => (
  payload: StreamPayload,
) => {
  return payload
}

export type ActPayload = (payload: StreamPayload) => any

export const pipe = (...actions: ActPayload[]): ActChain => {
  return {
    type: ChainType.act,
    func: (payload: StreamPayload) => {},
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
