import { Room, Client } from 'colyseus'
import { MapState, State } from '../states'

/**
 * MapController
 * Deal with events, and server calls related to a game Map/Level
 */
export class MapRoomController extends Room<MapState> {

  onInit (options: { map: string }) {
    let stack = new Error().stack

    console.log(`MapRoomController#init`)

    this.setState(new MapState(options.map, this))
    this.setSimulationInterval(this.state.simulate(this.state), 500)
    // this.setPatchRate(patchRate)
  }

  requestJoin (options: any, isNew: boolean) {
    // TODO
    console.log(`MapRoomController#Join requested ${options}`)
    return true
  }

  onAuth (options: any) {
    console.log(`MapRoomController#AUTH`)

    // TODO
    return true
  }

  onJoin (client: Client, options: any, auth: any) {
    // TODO AUTH
    console.log(`MapRoomController#onJoin ${client}`)

    this.state.onJoin(client, options)
  }

  onMessage (client: Client, message: any) {
    console.log(message)

    this.state.onMessage(client, message)
  }

  onLeave (client: Client, consented: boolean) {
    this.state.onLeave(client, consented)
  }

  onDispose () {
    this.state.onDispose()
  }
}
