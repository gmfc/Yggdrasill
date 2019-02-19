import { Room } from 'colyseus'
import { SlimeAi } from '../../ai/SlimeAi'
import { AiAgent } from '../abstractions/AiAgent'

export class Slime extends AiAgent {

  constructor (id: string, room: Room) {
    super(id, room)
    this.ai = new SlimeAi(this)
    this.x = 500 * Math.random()
    this.y = 500 * Math.random()
  }

}
