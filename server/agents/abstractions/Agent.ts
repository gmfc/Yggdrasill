import { nosync, Room } from 'colyseus'
import { MapState } from '../../states'
import { AgentAction } from '../player/Player'

export abstract class Agent {

  public id: string

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

  public abstract sendAction (action: AgentAction)

}
