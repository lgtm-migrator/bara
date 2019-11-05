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
