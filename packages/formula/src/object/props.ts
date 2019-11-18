import { Formula } from '../types'

// Copyright: @sindresorhus dot-prop

const isObj = (value: unknown | any): boolean => {
  const type = typeof value
  return value !== null && (type === 'object' || type === 'function')
}

const disallowedKeys = ['__proto__', 'prototype', 'constructor']

const isValidPath = (pathSegments: string[]) =>
  !pathSegments.some((segment: string) => disallowedKeys.includes(segment))

function getPathSegments(path: string): string[] {
  const pathArray = path.split('.')
  const parts: string[] = []

  for (let i = 0; i < pathArray.length; i += 1) {
    let p = pathArray[i]

    while (p[p.length - 1] === '\\' && pathArray[i + 1] !== undefined) {
      p = p.slice(0, -1) + '.'
      i += 1
      p += pathArray[i]
    }

    parts.push(p)
  }

  if (!isValidPath(parts)) {
    return []
  }

  return parts
}

// Source: https://github.com/sindresorhus/dot-prop/blob/0efd03e2bffa6da4ebd69a3e5d43d6656b9b518e/index.js#L35
/**
 * Get object value by providing the access path
 * @param object
 * @param path
 * @param value
 */
export const lensProp = (path: string, value?: any): any => (object: any) => {
  let newObject = object
  if (!isObj(newObject) || typeof path !== 'string') {
    return value === undefined ? newObject : value
  }

  const pathArray = getPathSegments(path)
  if (pathArray.length === 0) {
    return
  }

  for (let i = 0; i < pathArray.length; i += 1) {
    if (!Object.prototype.propertyIsEnumerable.call(newObject, pathArray[i])) {
      return value
    }

    newObject = newObject[pathArray[i]]
    if (newObject === undefined || newObject === null) {
      if (i !== pathArray.length - 1) {
        return value
      }
      break
    }
  }

  return newObject
}
// const deepObj = lensProp('a.b.c')({a: {b: {c: "hello", d: "world"}}})
// console.log(deepObj)

/**
 * Extract set of props to a new object from provided object
 * @param propList List of props name need to be extracted
 */
export const extractProps = (propList: Array<string | number>) => (
  payload: any,
) => {
  const obj: any = {}
  for (const prop of propList) {
    if (prop in payload) {
      obj[prop] = payload[prop]
    }
  }
  return obj
}
// const newObj = extractProps(['a'])({a: 'hello', b: 'world'})
// console.log(newObj)

/**
 * Dispose an object into array of properties
 * which is based on the props list order.
 * @param propList List of props name need to be disposed
 * @param collapse Whether to remove undefined property or not
 */
export const disposeProps = (
  propList: Array<string | number>,
  collapse?: boolean,
) => (payload: any) => {
  const array: any = []
  for (const prop of propList) {
    if (prop in payload) {
      array.push(payload[prop])
    } else if (!collapse) {
      array.push(undefined)
    }
  }
  return array
}
// const array = disposeProps(['a', 'b', 'c'])({ a: 'hello', b: 'world' })
// console.log(array)

/**
 * Modify a property value with a modifier to payload object
 * @param propName
 * @param modifier
 */
export const evolveProp = (
  propName: string,
  modifier: (propVal: any, ...rest: any[]) => any,
) => async (payload: any, ...rest: any[]) => {
  return !!payload && propName in payload
    ? {
        ...payload,
        [propName]: await Promise.resolve(modifier(payload[propName], ...rest)),
      }
    : payload
}
// const a = evolveProp('a', () => 'world')({a: 'hello'})
// console.log(a)

/**
 * Add a new property to an object.
 * @param propName
 * @param modifier
 */
export const addProp = (propName: string, formula: Formula) => async (
  payload: any,
  ...rest: any[]
) => {
  return {
    ...payload,
    [propName]: await Promise.resolve(formula(payload, ...rest)),
  }
}
// const a = addProp('b', () => 'world')({a: 'hello'})
// console.log(a)

type F = () => any

/**
 * Map an array with specific prop with the `payload` as second argument.
 *
 * @param propName which prop name to map.
 * @param formula Map to which action of data.
 */
export const mapProp = (propName: string, formula: Formula) => async (
  payloadOrFunc: any[] | F,
  ...rest: any[]
) => {
  if (typeof payloadOrFunc === 'function') {
    return (rest[0] as any[]).map((data: any) => () => {
      return formula(data, payloadOrFunc, ...rest)
    })
  }

  return await Promise.all(
    ((payloadOrFunc as any)[propName] as any[]).map((element: any) => {
      return formula(element, payloadOrFunc, ...rest)
    }),
  )
}
