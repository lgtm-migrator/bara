/**
 * Split an object in to an array
 * @param delimiter
 */
export const s2a = (delimiter: string = '/') => (path: string) =>
  path && path.length ? path.split(delimiter) : []
