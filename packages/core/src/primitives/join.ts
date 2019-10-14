export const joinWith = (delimiter: string, additions: string[] = []) => (
  payload: string[],
) => {
  return [...payload, ...additions].join(delimiter)
}
