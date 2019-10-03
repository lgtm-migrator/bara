import { run, app, popEvent, popSeep, act, cond } from '@bara/core'
import { ExpressServer, WhenRouteGet } from '.'

const { whenInitialized, whenRouteGet } = popEvent(ExpressServer)
// const { hasQuery } = popSeep(ExpressServer)
const hasQuery = (str: string) => {}
console.log(`whenRouteGet`, whenRouteGet())

run(
  app({
    portion: [ExpressServer({ port: 3200 })],
    trigger: [
      whenInitialized(
        // An `act` will also be created new stream when subscribe to a flow.
        act(() => console.log('Hello from Bara trigger')),
      ),
      whenRouteGet(
        // Each `cond` will create to new sub stream with its own conditional checker.
        cond(
          hasQuery('first'),
          act(({ request, response }: WhenRouteGet) => {
            console.log(request)
            response.send({ success: 'Congrats!' })
          }),
        ),
      ),
    ],
  }),
)
