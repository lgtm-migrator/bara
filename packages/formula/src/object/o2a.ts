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
 * @param props Configuration for object - array function.
 */
export const o2a = (props: O2aProps) => (payload: any) => {
  const { index, prop } = props
  let array: any = []
  let i: number = 0
  for (const propName of payload) {
    const element = { ...payload[propName] }
    if (index) {
      element._index = i
    }
    if (prop) {
      element._prop = prop
    }
    array = [...array, element]
    i += 1
  }
  return array
}
