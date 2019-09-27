import express from 'express'
import { portion, flow } from '@bara/core/src'

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
  // TODO Remove `flow` property and make any `when` sibling with root
  whenInitialized: flow({
    bootstrap: ({ context: expressApp, next, mold }: any) => {
      const { port } = mold
      expressApp.listen(port, function() {
        next()
        console.log(`Example expressApp listening on port ${port}`)
      })
    },
  }),
  // whenRouteRequest: flowCombineLatest(flowOf('name'))({
  //   func: ({ context: expressApp, next }: any) => {
  //     expressApp.get('*', (req: any, res: any) => {
  //       next(req)
  //       res.send('Hello World!')
  //     })
  //   },
  // }),
})
