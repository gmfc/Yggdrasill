import { AiAgent } from '../abstractions/AiAgent'
import { SlimeAi } from '../../ai/SlimeAi'
import { Room, nosync } from 'colyseus'

export class Slime extends AiAgent {

  constructor (id: string, room: Room) {
    super(id, room)
    this.ai = new SlimeAi(this)
    this.x = 500 * Math.random()
    this.y = 500 * Math.random()
  }

}
