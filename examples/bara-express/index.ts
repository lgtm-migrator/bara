import express from 'express'
import { portion, flow } from '@bara/core'

export interface ExpressMold {
  port?: number
}

export const ExpressServer = portion<
  express.Request,
  express.Application,
  ExpressMold
>({
  mold: { port: +process.env.PORT! || 3456 },
  init: () => {
    const expressApp: express.Application = express()
    return expressApp
  },
  whenInitialized: flow({
    bootstrap: ({ context: expressApp, next, mold }: any) => {
      const { port } = mold
      expressApp.listen(port, function() {
        next()
        console.log(`Express server is listening on port ${port}`)
      })
    },
  }),
  whenRouteGet: flow<express.Request, express.Application, ExpressMold>({
    bootstrap: ({ context: expressApp, next }) => {
      expressApp.get('*', (req, res) => {
        next(req)
        res.send('Hello World!')
      })
    },
  }),
})
