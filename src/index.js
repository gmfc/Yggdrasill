import path from 'path'
import express from 'express'
import { createServer } from 'http'
import { Server } from 'colyseus'
import { monitor } from '@colyseus/monitor'

import { ChatRoom } from './rooms/chat'
import { StateHandlerRoom } from './rooms/state'

console.log(`ola, static esta em: ${path.join(__dirname, 'static')}`)
const port = Number(process.env.PORT || 8080)
const app = express()

const gameServer = new Server({
  server: createServer(app)
})

gameServer.register('chat', ChatRoom)
gameServer.register('state_handler', StateHandlerRoom)

app.use('/', express.static(path.join(__dirname, 'static')))

app.use('/colyseus', monitor(gameServer))

gameServer.onShutdown(() => {
  console.log(`game server is going down.`)
})

gameServer.listen(port)
console.log(`Listening on http://localhost:${port}`)
