export interface Base {
  name: string
}

export type Use<T> = (...args: any[]) => T
