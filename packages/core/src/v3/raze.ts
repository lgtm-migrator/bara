export const razeEvent = (
  portion: any,
): { [key: string]: (...args: any[]) => any } => {
  const { publishers } = portion
  const events = publishers.map((publisher: any) => publisher.event)
  return events
}

export const razeCondition = (
  portion: any,
): { [key: string]: (...args: any[]) => any } => {
  const { reep } = portion
  return reep
}
