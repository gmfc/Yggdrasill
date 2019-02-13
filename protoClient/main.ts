import { Client } from 'colyseus.js'

const HOST = 'ws://localhost:2567'

let client = new Client(HOST)

let room = client.join('map')

