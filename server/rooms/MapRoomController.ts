import { Room, Client } from 'colyseus'
import { MapState, State } from '../states'

/**
 * MapController
 * Deal with events, and server calls related to a game Map/Level
 */
export class MapRoomController extends Room<State> {

  onInit (options: { map: string }) {
    const simulationInterval = 30
    const patchRate = 30
    this.setState(new MapState(options.map, this))
    this.setSimulationInterval(this.state.simulate, simulationInterval)
    this.setPatchRate(patchRate)
  }

  requestJoin (options: any, isNew: boolean) {
    // TODO
    return true
  }

  onAuth (options: any) {
    // TODO
    return true
  }

  onJoin (client: Client, options: any, auth: any) {
    // TODO AUTH
    this.state.onJoin(client, options)
  }

  onMessage (client: Client, message: any) {
    this.state.onMessage(client, message)
  }

  onLeave (client: Client, consented: boolean) {
    this.state.onLeave(client, consented)
  }

  onDispose () {
    this.state.onDispose()
  }
}
