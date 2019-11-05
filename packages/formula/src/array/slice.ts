/**
 * Imutable slicing an array into sub-array.
 * @param startIndex Begin
 * @param endIndex End
 */
export const slice = (startIndex: number, endIndex: number) => (
  payload: any[],
) => {
  const copiedPayload = [...payload]
  return copiedPayload.slice(startIndex, endIndex)
}
