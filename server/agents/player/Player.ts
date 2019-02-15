import { Room, nosync } from 'colyseus'
import { MapState } from '../../states'
import { ActionAgent } from '../abstractions/ActionAgent'

export class Player extends ActionAgent {

  constructor (id: string, room: Room) {
    super(id,room)
  }

  public move (data: string): void {
    switch (data) {
      case 'ArrowUp':
        this.y -= 10
        break
      case 'ArrowDown':
        this.y += 10
        break
      case 'ArrowLeft':
        this.x -= 10
        break
      case 'ArrowRight':
        this.x += 10
        break
    }
  }

  public perform (): void {
    let [action, data] = this.getActionToPerform()
    switch (action) {
      case 'keydown':
        this.move(data)
        this.setActionToPerform(['none','none'])
        break
    }
  }

  public simulate (deltaTime: number, mapState: MapState): void {

    if (this.getActionToPerform()) {
      this.perform()
    }
  }

}
