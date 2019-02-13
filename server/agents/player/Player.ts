import { Agent } from '../abstractions'
import { Room, nosync } from 'colyseus'
import { MapState } from '../../states'

export class Player extends Agent {

  @nosync
  private actionToPerform: any = false

  constructor (id: string, room: Room) {
    super(id,room)
  }

  public perform (message: any): void {
    this.actionToPerform = message
  }

  public simulate (deltaTime: number, mapState: MapState): void {
    if (this.actionToPerform) {
      this.room.broadcast(`${this.id} is performing ${JSON.stringify(this.actionToPerform)}`)
      this.actionToPerform = false
    }
  }

}
