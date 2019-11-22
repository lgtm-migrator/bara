export const copyObject = () => (payload: any) =>
  JSON.parse(JSON.stringify(payload))
