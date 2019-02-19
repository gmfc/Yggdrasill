import { nosync, Room } from 'colyseus'
import { MapData } from '../../data'
import { MapState } from '../../states'
import { AgentAction } from '../player/Player'

export abstract class Agent {

  public id: string

  @nosync
  public room: Room

  @nosync
  public mapData: MapData

  constructor (id: string, room: Room, mapData: MapData) {
    this.room = room
    this.id = id
    this.mapData = mapData
  }

  /**
   * Calculate action to perform or simulates something
   * @param deltaTime
   * @param mapState
   */
  public abstract simulate (deltaTime: number, mapState: MapState): void

  public abstract sendAction (action: AgentAction)

}
