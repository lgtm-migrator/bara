/**
 * Split to object, split by delimiter and takes only selected segment
 * @param delimiter
 * @param takes
 */
export const s2o = (
  delimiter: string = ' ',
  takes: { [k: number]: string } = {},
) => (path: string) => {
  const splitter = path.split(delimiter)
  const obj = splitter.reduce((acc: any, val: any, index: number) => {
    return { ...acc, [takes[index] || index]: val }
  }, {})
  return obj
}

/**
 * Split an object in to an array
 * @param delimiter
 */
export const s2a = (delimiter: string = '/') => (path: string) =>
  path && path.length ? path.split(delimiter) : []
