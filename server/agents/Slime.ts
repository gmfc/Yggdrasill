import { AiAgent } from './abstractions/AiAgent'
import { SlimeAi } from '../ai/SlimeAi'
import { Room, nosync } from 'colyseus'

export class Slime extends AiAgent {

  @nosync
  private room: Room

  constructor (public id: string, room: Room) {
    super(id)
    this.ai = new SlimeAi(this)
    this.room = room
  }

  public talk (text: string): void {
    console.log(`Slime#${this.id}: ${text}`)
    this.room.broadcast(`Broadcast@Slime#${this.id}: ${text}`)
  }
}
