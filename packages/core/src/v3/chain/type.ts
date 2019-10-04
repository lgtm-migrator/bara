export enum ChainType {
  cond = 'cond',
  act = 'act',
}

export interface Chain {
  type: ChainType
  func: (payload: Chain | any) => any
}
