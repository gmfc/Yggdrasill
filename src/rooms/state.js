import { Room } from 'colyseus'

export class State {
  constructor (options) {
    this.players = {}
    this.createNPC('NPC')
  }

  createPlayer (id) {
    this.players[id] = new Player()
  }

  createNPC (id) {
    this.players[id] = new NPC()
  }

  removePlayer (id) {
    delete this.players[id]
  }

  simulate () {
    for (const id in this.players) {
      if (this.players[id].npc) {
        let move = Math.floor(Math.random() * 4)
        if (move === 0) {
          this.movePlayer(id, {x: 1})
        } else if (move === 1) {
          this.movePlayer(id, {x: -1})
        } else if (move === 2) {
          this.movePlayer(id, {y: 1})
        } else {
          this.movePlayer(id, {y: -1})
        }
      }
    }
  }

  movePlayer (id, movement) {
    if (movement.x) {
      this.players[id].x += movement.x * 10
    } else if (movement.y) {
      this.players[id].y += movement.y * 10
    }
  }
}

export class Player {
  constructor () {
    this.x = Math.floor(Math.random() * 400)
    this.y = Math.floor(Math.random() * 400)
    this.color = Math.floor(Math.random() * 6)
  }
}

export class NPC extends Player {
  constructor () {
    super()
    this.npc = true
  }
}

export class StateHandlerRoom extends Room {
  constructor () {
    super()
    this.setSimulationInterval(() => {
      this.state.simulate()
    })
  }

  onInit (options) {
    console.log('StateHandlerRoom created!', options)
    this.setState(new State())
  }

  onJoin (client) {
    this.state.createPlayer(client.sessionId)
  }

  onLeave (client) {
    this.state.removePlayer(client.sessionId)
  }

  onMessage (client, data) {
    console.log('StateHandlerRoom received message from', client.sessionId, ':', data)
    this.state.movePlayer(client.sessionId, data)
  }

  onDispose () {
    console.log('Dispose StateHandlerRoom')
  }
}
