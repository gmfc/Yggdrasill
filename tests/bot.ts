import { Client, Room } from 'colyseus.js'

export function requestJoinOptions (this: Client, i: number) {
  return { requestNumber: i }
}

export function onJoin (this: Room) {
  let mapSize = 500
  let tx = Math.random() * mapSize
  let ty = Math.random() * mapSize
  setInterval(() => {
    this.send({ action: 'setTarget', data: { x: tx, y: ty } })
  }, 8000)
  console.log(this.sessionId, 'joined.')
}

export function onMessage (this: Room, message) {
  console.log(this.sessionId, 'received:', message)
}

export function onLeave (this: Room) {
  console.log(this.sessionId, 'left.')
}

export function onError (this: Room, err) {
  console.log(this.sessionId, '!! ERROR !!', err.message)
}

export function onStateChange (this: Room, state) {
  console.log(this.sessionId, 'new state:', state)
}
