export const propLens = (propName: string, defaultValue: any = null) => (
  payload: any,
) => {
  return !!payload && propName in payload ? payload[propName] : defaultValue
}

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

export const arrangeProps = (propList: Array<string | number>) => (
  payload: any,
) => {
  const array: any = []
  for (const prop of propList) {
    if (prop in payload) {
      array.push(payload[prop])
    }
  }
  return array
}

export const propMod = (propName: string, modifier: (propVal: any) => any) => (
  payload: any,
) => {
  return !!payload && propName in payload
    ? { ...payload, [propName]: modifier(payload[propName]) }
    : payload
}

export const propAdd = (propName: string, modifier: (payload: any) => any) => (
  payload: any,
) => {
  return { ...payload, [propName]: modifier(payload) }
}
