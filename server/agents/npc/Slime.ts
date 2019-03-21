import { Room } from 'colyseus'
import { SlimeAi } from '../../ai/SlimeAi'
import { MapData } from '../../data'
import { StaticDie } from '../../util'
import { AiAgent } from '../abstractions/AiAgent'

export class Slime extends AiAgent {

  constructor (id: string, room: Room, mapData: MapData) {
    super(id, room, mapData)
    this.ai = new SlimeAi(this)
  }

}
