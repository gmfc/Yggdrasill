import { Agent } from '../abstractions'
import { Room } from 'colyseus'
import { MapState } from '../../states'

export class Player extends Agent {
  constructor (id: string, room: Room) {
    super(id,room)
  }

  public simulate (deltaTime: number, mapState: MapState): void {
    // TODO
  }

}
