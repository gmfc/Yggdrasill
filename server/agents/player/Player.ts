import { Room, nosync } from 'colyseus'
import { MapState } from '../../states'
import { ActionAgent } from '../abstractions/ActionAgent'

export class Player extends ActionAgent {

  constructor (id: string, room: Room) {
    super(id,room)
  }

  public perform (actionToPerform: any): void {
    this.room.broadcast(actionToPerform)
  }

  public simulate (deltaTime: number, mapState: MapState): void {
    if (this.getActionToPerform) {
      this.perform(this.getActionToPerform)
      this.setActionToPerform(false)
    }
  }

}
