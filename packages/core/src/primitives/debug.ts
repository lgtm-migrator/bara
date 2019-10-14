const shortenObject = (obj: any): any => {
  const debugObj: any = obj
  for (const prop in obj) {
    if (prop in obj) {
      let refineValue = obj[prop]
      if (typeof obj[prop] === 'object') {
        debugObj[prop] = shortenObject(obj[prop])
      }
      if (typeof obj[prop] === 'string' && obj[prop].length > 100) {
        refineValue = `[Hide ${obj[prop].length} characters string]`
      }
      debugObj[prop] = refineValue
    }
  }
  return debugObj
}

export const debug = (...params: any[]) => {
  const debugObj: any = shortenObject(params[0])
  console.info(JSON.stringify(debugObj, null, 2))
  return params
}
