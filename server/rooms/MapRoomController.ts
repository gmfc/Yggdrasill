import { Client, Room } from 'colyseus'
import { MapState } from '../states'
import { getMapData } from '../data'

/**
 * MapController
 * Deal with events, and server calls related to a game Map/Level
 */
export class MapRoomController extends Room<MapState> {

  async onInit (options: { map: string }) {
    console.log(`MapRoomController#onInit`)
    const mapData = await getMapData(options.map)
    this.setMetadata(mapData)
    this.setState(new MapState(mapData, this))

    let simulationInterval = 1000 / 10
    this.setPatchRate(simulationInterval / 2)
    this.setSimulationInterval(this.state.simulate(this.state), simulationInterval)
  }

  requestJoin (options: any, isNew: boolean) {
    // TODO
    console.log(`MapRoomController#requestJoin requested ${JSON.stringify(options)}`)
    return true
  }

  onAuth (options: any) {
    console.log(`MapRoomController#AUTH`)

    // TODO
    return true
  }

  onJoin (client: Client, options: any, auth: any) {
    // TODO AUTH
    console.log(`MapRoomController#onJoin ${JSON.stringify(client)}`)

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
