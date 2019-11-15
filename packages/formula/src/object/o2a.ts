export interface O2aProps {
  /**
   * Whether to include index number or not.
   */
  index?: boolean
  /**
   * Whether to include prop name or not.
   */
  prop?: boolean
}

/**
 * Convert object key-value into single array.
 * @param config Configuration for object - array function.
 */
export const o2a = (config: O2aProps = { index: false, prop: false }) => (
  payload: any,
) => {
  const { index, prop } = config
  let array: any = []
  let i: number = 0
  for (const propName in payload) {
    if (propName in payload) {
      const element = { ...payload[propName] }
      if (index) {
        element._index = i
      }
      if (prop) {
        element._prop = propName
      }
      array = [...array, element]
      i += 1
    }
  }
  return array
}

// const a = o2a({ index: true, prop: true })({ '1': 'a', a: 'b' })
// a
