import { DoWithAction } from './model'

export const toCurry = (func: DoWithAction) => (
  data: any,
): Promise<any> | any | undefined | void => func(data, new Set())
