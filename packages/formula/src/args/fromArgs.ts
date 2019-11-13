import { Formula } from '../types'

/**
 * Convert from comma separated args to an object args.
 * @param argsName Array of arguments name
 * @param formula Formula to receive the arguments
 */
export const fromArgs = (argsName: string[], formula: Formula) => (
  ...argsList: any[]
) => {
  const argsObj: {
    [k: string]: any
  } = {}
  let i = 0
  for (const arg of argsList) {
    argsObj[argsName[i]] = arg
    i += 1
  }
  return formula(argsObj)
}
