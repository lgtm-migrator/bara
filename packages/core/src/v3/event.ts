import { BaraPortion } from '.'

export type VirtualAction = (...actions: any[]) => {}

/**
 * Pop out one or more event at a time.
 * This will return a curry function to match out.
 *
 * @param portion BaraPortion
 */
export const popEvent = <T, C, M>(
  portion: BaraPortion<T, C, M>,
): {
  [k: string]: VirtualAction
} => {
  const { mold, init, ...flows } = portion()
  let flowNames: string[] = [] // Use as immutable array

  for (const flowName in flows) {
    // Bara rules to treat a flow name started with 'when' keyword
    if (flowName.startsWith('when') && flowName in flows) {
      flowNames = [...flowNames, flowName]
    }
  }

  // Pseudo code for a flow subscriber
  const createFlowAction = (flowName: string) => (...actions: any[]) => {
    console.log(`Flow: `, flows[flowName])
    return { flowName, actions, seep: flows[flowName].seep || {} }
  }

  // Virtual flow only use as the curry function which is carrying the flow name
  // This make the Bara flow know which Portion to subscribe to.
  const virtualFlows: { [k: string]: any } = flowNames.reduce(
    (acc: any, flowName) => {
      acc[flowName] = createFlowAction(flowName)
      return acc
    },
    {},
  )
  return virtualFlows
}
