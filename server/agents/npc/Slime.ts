import { Room } from 'colyseus'
import { SlimeAi } from '../../ai/SlimeAi'
import { MapData } from '../../data'
import { StaticDie } from '../../util'
import { AiAgent } from '../abstractions/AiAgent'
import { AgentAction } from '../player/Player'

export class Slime extends AiAgent {

  constructor (id: string, room: Room, mapData: MapData) {
    super(id, room, mapData)
    this.ai = new SlimeAi(this)
    this.x = this.mapData.size * StaticDie.number
    this.y = this.mapData.size * StaticDie.number
    this.setTaget(StaticDie.number * this.mapData.size, StaticDie.number * this.mapData.size)
    this.speed = 2
  }

  public sendAction (action: AgentAction) {
    // Does Nothing
  }

}
