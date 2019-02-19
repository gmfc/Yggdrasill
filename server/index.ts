import { monitor } from '@colyseus/monitor'
import { Server } from 'colyseus'
import * as express from 'express'
import { createServer } from 'http'
import * as path from 'path'
import { MapRoomController } from './rooms'

const port = Number(process.env.PORT || 2567)
const app = express()

// Attach WebSocket Server on HTTP Server.
const gameServer = new Server({
  server: createServer(app)
})

app.use('/monitor', monitor(gameServer))

gameServer.register('map', MapRoomController, {
  map: 'test'
}).catch(err => {
  console.error(err)
})

app.use('/', express.static(path.join(__dirname, '../dist')))


gameServer.onShutdown(() => {
  console.log(`game server is going down.`)
})

gameServer.listen(port)
console.log(`Listening on http://localhost:${port}`)
