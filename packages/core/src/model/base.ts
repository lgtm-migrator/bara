export interface Base {
  name: string | null
}

export type Use<T> = (...args: any[]) => T
