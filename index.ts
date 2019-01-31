import * as express from 'express'
import { Server, RedisPresence } from 'colyseus'
import { createServer } from 'http'
import * as path from 'path'
import { monitor } from '@colyseus/monitor'
import { Map } from './server/rooms'

const port = Number(process.env.PORT || 2567)
const app = express()

// Attach WebSocket Server on HTTP Server.
const gameServer = new Server({
  server: createServer(app),
  verifyClient: (info, next) => {
    next(true)
  },
  presence: new RedisPresence()
})

gameServer.register('map', Map, {
  map: 'test'
})

app.use('/', express.static(path.join(__dirname, 'static')))

app.use('/monitor', monitor(gameServer))

gameServer.onShutdown(() => {
  console.log(`game server is going down.`)
})

gameServer.listen(port)
console.log(`Listening on http://localhost:${port}`)
