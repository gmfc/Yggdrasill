import { nosync, Room } from 'colyseus'
import { MapData } from '../../data'
import { MapState } from '../../states'
import { ActionAgent } from '../abstractions/ActionAgent'

export class Player extends ActionAgent {

  constructor (id: string, room: Room, mapData: MapData) {
    super(id,room, mapData)
    // this.speed = 3
    this.x = 6
    this.y = 5
    this.color = 0xFF0000
  }

  public perform (): void {
    // this.goToTarget()
    let { action, data } = this.getActionToPerform()
    switch (action) {
      case 'setTarget':
        // this.setTaget(data.x, data.y)
    }
  }

  public simulate (deltaTime: number, mapState: MapState): void {
    this.perform()
  }

}
