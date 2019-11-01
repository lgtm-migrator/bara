/**
 * Join array from payload with a specified delimiter and additions elements
 * @param delimiter Join with which char?
 * @param additions Add more element to the provided array if need
 */
export const joinWith = (delimiter: string, additions: string[] = []) => (
  payload: string[],
) => {
  // TODO Allow `additions` to be extensible via a curry function
  return [...payload, ...additions].join(delimiter)
}
