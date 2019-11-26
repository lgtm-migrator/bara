/**
 * Delay the next formula execution.
 * @param duration Duration in miliseconds
 */
export const delay = (duration: number) => async (payload: any) => {
  return new Promise(resolve => {
    setTimeout(() => resolve(payload), duration)
  })
}
