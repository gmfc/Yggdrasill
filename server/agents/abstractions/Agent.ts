import { MapState } from '../../states'
import { Room, nosync } from 'colyseus'

export abstract class Agent {

  public id: string

  public x: number = 0

  public y: number = 0

  @nosync
  public room: Room

  constructor (id: string, room: Room) {
    this.room = room
    this.id = id
  }

  public abstract simulate (deltaTime: number, mapState: MapState): void

}
