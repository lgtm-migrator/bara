import { BaraPortion } from '../portion'
import { StreamPayload } from '../stream'
import { ActChain, ChainType } from './type'

export type ActPayload = (payload: StreamPayload, contextes: any) => any

export const act = (action: ActPayload | ActPayload[]): ActChain => {
  return {
    type: ChainType.act,
    func: (payload: StreamPayload, contextes: any) => {
      if (typeof action === 'function') {
        action(payload, contextes)
      } else {
        if (action.length) {
          ;(action as ActPayload[]).map(a => a(payload, contextes))
        }
      }
    },
    link: parent => {
      return parent
    },
  }
}

export const withContext = (
  actChain: ActChain,
  ...portions: Array<BaraPortion<any, any, any>>
): ActChain => {
  const originFunc = actChain.func
  const patchFunc = (payload: any, contextes: any) => {
    const contextList: any = []
    for (const p of portions) {
      const portionName = p().name
      const portion = portionName in contextes ? contextes[portionName] : null
      contextList.push(portion.context)
    }
    originFunc(payload, contextList)
  }
  actChain.func = patchFunc
  return actChain
}

export const getContext = (portionName: string, contextes: any) => {
  const portion = portionName in contextes ? contextes[portionName] : null
  const context = portion.context
  return context
}
