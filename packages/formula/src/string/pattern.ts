/**
 * Check if a string match with a regular expression pattern.
 * @param p String RegExp Pattern
 */
export const pattern = (p: RegExp | string) => (payload: any) => {
  const regexp = typeof p === 'string' ? new RegExp(p) : p
  return regexp.test(payload)
}

// Prototype:
// pattern(/Hello$/)('Hello World') // ?
// pattern(/Hello$/)('World Hello') // ?
// pattern('Hello$')('World Hello') // ?
// pattern('Hello$')('Hello World ') // ?
