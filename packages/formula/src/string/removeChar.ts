/**
 * Remove any string match search expression
 * @param expr Which character to be trimmed
 */
export const removeChar = (expr: string) => (payload: string) =>
  payload.replace(new RegExp(expr), '')
