import { Room, Client } from 'colyseus'
import { MapState } from '../state'

export class Map extends Room<MapState> {
  onInit (options: { map: string }) {

    this.setState(new MapState(options.map, this))
    this.setSimulationInterval(this.state.simulate, 30)
    this.setPatchRate(30)
  }

  requestJoin (options: any, isNew: boolean) {
    return true
  }

  onAuth (options: any) {
    return true
  }

  onJoin (client: Client, options: any, auth: any) {
    this.state.createPlayer(client)
  }

  onMessage (client: Client, message: any) {
    this.state.propagateMessage(client, message)
  }

  onLeave (client: Client, consented: boolean) {
    this.state.removePlayer(client)
  }

  onDispose () {
    this.state.dispose()
  }
}
