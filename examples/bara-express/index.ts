import express, { Request, Response, Application } from 'express'
import { portion, flow, cond } from '@bara/core'

export interface ExpressMold {
  port?: number
}

export interface WhenRouteGet {
  request: Request
  response: Response
}

export const ExpressServer = portion<Request, Application, ExpressMold>({
  mold: { port: +process.env.PORT! || 3456 },
  init: () => {
    const expressApp: Application = express()
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
  whenRouteGet: flow<WhenRouteGet, Application, ExpressMold>({
    bootstrap: ({ context: expressApp, awaitable }) => {
      expressApp.get('*', (request: Request, response: Response) => {
        awaitable({ request, response })
      })
    },
    seep: {
      hasQuery: (query?: string) => ({ request }: WhenRouteGet) => {
        return !!request.query && query && query in request.query
      },
      hasRoute: (route?: string) => ({ request }: WhenRouteGet) => {
        return request.route === route
      },
    },
  }),
})
