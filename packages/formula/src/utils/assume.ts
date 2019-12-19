/**
 * Assume a payload functionality equal to data.
 * This function will make the clearance of bara formula flow
 * by describing what will be used as input.
 *
 * @param data Mock data suppose to be input
 */
export const assume = (data: any, isDebug = false) => (payload: any) => {
  if (isDebug) return data
  return payload !== undefined ? payload : data
}
