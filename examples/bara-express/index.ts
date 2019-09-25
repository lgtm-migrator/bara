import express from 'express'
import { portion, stream, fromContext, flow } from '@bara/core'

export interface ExpressMold {
  port?: number
}

export const ExpressPortion = portion<any, express.Application, ExpressMold>({
  mold: { port: 3000 },
  init: ({ port }: ExpressMold) => {
    const expressApp: express.Application = express()
    return stream({
      source: fromContext(expressApp),
      context: expressApp,
    })
  },
  flow: {
    whenInitialized: flow({
      func: ({ context: expressApp, next, mold }: any) => {
        const { port } = mold
        expressApp.listen(port, function() {
          console.log('Example expressApp listening on port 3000!')
        })
        console.log(`I'm live!`)
      },
    }),
    whenRouteRequest: flow({
      func: ({ context: expressApp, next }: any) => {
        expressApp.get('/', (req: any, res: any) => {
          next(req)
          res.send('Hello World!')
        })
      },
    }),
  },
})
