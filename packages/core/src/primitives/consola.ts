// const enable = false

// export const consola = enable
//   ? {
//       log: console.log,
//       info: console.info,
//       error: console.error,
//       debug: console.debug,
//     }
//   : {
//       log: () => null,
//       info: () => null,
//       error: () => null,
//       debug: () => null,
//     }

export const consola = {
  log: (...args: any[]) => null,
  info: (...args: any[]) => null,
  error: (...args: any[]) => null,
  debug: (...args: any[]) => null,
  warn: (...args: any[]) => null,
}

export default consola
