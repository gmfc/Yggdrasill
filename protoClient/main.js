import { Client } from 'colyseus.js'
import $ from 'jquery'



$(document).ready(() => {
  const ENDPOINT = 'ws://localhost:2567'

  let client = new Client(ENDPOINT)

  let room = client.join('map')

  room.onMessage.add((message) => {
    console.log(message)
  })

  $('html').keydown(e => {
    console.log(e.which)
    room.send({ walk: e.which })
  })

  $('html').keyup(e => {
    console.log(e.which)
    room.send({ reset: 'action' })
  })
})