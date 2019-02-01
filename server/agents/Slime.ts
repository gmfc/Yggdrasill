import { AiAgent } from './abstractions/AiAgent'
import { SlimeAi } from '../ai/SlimeAi'
import { Room, nosync } from 'colyseus'

export class Slime extends AiAgent {

  constructor (id: string, room: Room) {
    super(id, room)
    console.log(`Slime#init ID:${id}`)
    this.ai = new SlimeAi(this)
  }

  public talk (text: string): void {
    console.log(`Slime#${this.id}: ${text}`)
    this.room.broadcast(`Broadcast@Slime#${this.id}: ${text}`)
  }
}
