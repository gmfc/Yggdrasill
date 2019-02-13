import { Room, nosync } from 'colyseus'
import { MapState } from '../../states'
import { ActionAgent } from '../abstractions/ActionAgent'

export class Player extends ActionAgent {

  constructor (id: string, room: Room) {
    super(id,room)
  }

  public perform (): void {
    if (this.getActionToPerform()['walk']) {
      this.room.broadcast(`Broadcast@PLayer#${this.id}: WALK`)
      this.setActionToPerform(false)
    }

    if (this.getActionToPerform()['reset']) {
      this.setActionToPerform(false)
    }
  }

  public simulate (deltaTime: number, mapState: MapState): void {

    if (this.getActionToPerform()) {
      this.perform()
    }
  }

}
