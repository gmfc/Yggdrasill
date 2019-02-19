import { nosync, Room } from 'colyseus'
import { MapState } from '../../states'

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

  /**
   * Calculate action to perform or simulates something
   * @param deltaTime
   * @param mapState
   */
  public abstract simulate (deltaTime: number, mapState: MapState): void

}
