import { Room } from 'colyseus'
import { MapState } from '../../states'
import { ActionAgent } from '../abstractions/ActionAgent'

export class Player extends ActionAgent {

  constructor (id: string, room: Room) {
    super(id,room)
  }

  public perform (): void {
    this.goToTarget()
    let { action, data } = this.getActionToPerform()
    switch (action) {
      case 'setTarget':
        this.setTaget(data.x, data.y)
    }
  }

  public simulate (deltaTime: number, mapState: MapState): void {
    this.perform()
  }

}
