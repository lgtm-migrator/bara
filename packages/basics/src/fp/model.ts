export interface ExtraParam {
  key: string
  val: any
}

export type DoWithAction = (
  payload: any,
  extras: Set<ExtraParam>,
) => Promise<any> | any | void

export type WithExtra = (
  level: number,
) => (payload: any, extras: Set<ExtraParam>) => Promise<any> | any | void
