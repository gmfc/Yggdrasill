import { Room, nosync } from 'colyseus'
import { MapState } from '../../states'
import { ActionAgent } from '../abstractions/ActionAgent'

export class Player extends ActionAgent {

  constructor (id: string, room: Room) {
    super(id,room)
  }

  private move (data: string): void {
    switch (data) {
      case 'w':
        this.y -= 10
        break
      case 's':
        this.y += 10
        break
      case 'a':
        this.x -= 10
        break
      case 'd':
        this.x += 10
        break
    }
  }

  public perform (): void {
    let { action, input } = this.getActionToPerform()
    switch (action) {
      case 'keydown':
        this.move(input)
        break
    }
  }

  public simulate (deltaTime: number, mapState: MapState): void {
    this.perform()
  }

}
