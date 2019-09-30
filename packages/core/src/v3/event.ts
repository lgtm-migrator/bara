import { BaraPortion } from '.'

export const popEvent = <T, C, M>(portion: BaraPortion<T, C, M>) => {
  const { mold, init, ...flows } = portion()
  let flowNames: string[] = [] // Use as immutable array
  for (const flowName in flows) {
    // Bara rules to treat a flow name started with 'when' keyword
    if (flowName.startsWith('when') && flowName in flows) {
      flowNames = [...flowNames, flowName]
    }
  }

  // Pseudo code for a flow subscriber
  const flowAction = (flowName: string) => (...conds: any[]) => (
    ...acts: any[]
  ) => {
    return { flowName, conds, acts }
  }

  // Virtual flow only use as the curry function which is carrying the flow name
  // This make the Bara flow know which Portion to subscribe to.
  const virtualFlows: { [k: string]: any } = flowNames.reduce(
    (acc: any, flowName) => {
      acc[flowName] = flowAction(flowName)
      return acc
    },
    {},
  )
  return virtualFlows
}
