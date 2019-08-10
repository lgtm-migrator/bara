export const takeFirst = () => (payload: any[]) => {
  return payload && payload.length ? payload[0] : null
}

export const takeLast = () => (payload: any[]) => {
  return payload && payload.length ? payload[payload.length - 1] : null
}
