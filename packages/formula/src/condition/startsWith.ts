export const startsWith = (searchString: string, position?: number) => (
  payload: string,
) => {
  return payload.startsWith(searchString, position)
}

// QuokkaJS
// console.log(
//     startsWith('abc')('abcde'),
//     startsWith('abc')('desabs'),
// )
