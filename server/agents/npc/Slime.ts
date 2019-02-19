import { Room } from 'colyseus'
import { SlimeAi } from '../../ai/SlimeAi'
import { StaticDie } from '../../util'
import { AiAgent } from '../abstractions/AiAgent'
import { AgentAction } from '../player/Player'

export class Slime extends AiAgent {

  constructor (id: string, room: Room) {
    super(id, room)
    this.ai = new SlimeAi(this)
    this.x = 500 * StaticDie.number
    this.y = 500 * StaticDie.number
  }

  public sendAction (action: AgentAction) {
    // Does Nothing
  }

}
