import { Formula } from '../types'

export interface ConcurrentProps {
  concurrency: number
  stopOnError?: boolean
}

// Source & inspiration from @sindresorhus: https://github.com/sindresorhus/p-map/blob/master/index.js

/**
 * Execute map/forEach/filter at a concurrency parallel.
 *
 * If you want to add new formula that is support with `concurrent`,
 * please use the first parameter as the function so that `concurrent`
 * can be aware of it.
 *
 * @param formula Which formula to be executed in a concurrency mode.
 * @param num Number of concurrencies task to be executed at a time.
 */
export const concurrent = (
  iterable: Formula,
  { concurrency, stopOnError }: ConcurrentProps,
) => async (payload: any, ...rest: any[]) => {
  return new Promise(async (resolve, reject) => {
    const result: any = []
    const errors: any = []
    let currentIndex = 0
    let resolvingCount = 0
    let isDone = false
    let isRejected = false
    const promises = await iterable(() => true, payload, ...rest)
    const iterator = promises[Symbol.iterator]()

    const next = () => {
      if (isRejected) {
        return
      }
      const nextItem = iterator.next()
      const i = currentIndex
      currentIndex += 1

      if (nextItem.done) {
        isDone = true

        if (resolvingCount === 0) {
          if (!stopOnError && errors.length !== 0) {
            reject(new Error(errors))
          } else {
            resolve(result)
          }
        }
        return
      }

      resolvingCount += 1
      ;(async () => {
        try {
          const element = nextItem.value
          result[i] = await Promise.resolve(element()) // ?
          resolvingCount -= 1
          next()
        } catch (err) {
          if (stopOnError) {
            isRejected = true
            reject(err)
          } else {
            errors.push(err)
            resolvingCount -= 1
            next()
          }
        }
      })()
    }

    for (let i = 0; i < concurrency; i += 1) {
      next()
      if (isDone) break
    }
  })
}

// Quokka:

// import { map } from '../array'
// const sample = [1, 2, 3, 4, 5]
// const result = concurrent(
//   map(num => {
//     console.log(num)
//     return num
//   }),
//   { concurrency: 2 },
// )(sample)

// result // ?

// import { mapProp } from '../object'
// const sample = [{a: 1}, {a: 2}, {a: 3}, {a: 4}, {a: 5}]
// const result = concurrent(
//   mapProp('a', num => {
//     console.log(num)
//     return num
//   }),
//   { concurrency: 2 },
// )(sample)

// result // ?

// const resultMap = map(num => num)(sample)
