/**
 *  Detect where it is a cyclic object or not *
 * @author: http://blog.vjeux.com/2011/javascript/cyclic-object-detection.html
 */
export function isCyclic(originObject: any): boolean {
  const seenObjects: any[] = []

  function detect(obj: any) {
    if (obj && typeof obj === 'object') {
      if (seenObjects.indexOf(obj) !== -1) {
        return true
      }
      seenObjects.push(obj)
      for (const key in obj) {
        if (obj.hasOwnProperty(key) && detect(obj[key])) {
          return true
        }
      }
    }
    return false
  }

  return detect(originObject)
}
