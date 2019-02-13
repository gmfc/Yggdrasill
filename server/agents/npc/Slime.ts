import { AiAgent } from '../abstractions/AiAgent'
import { SlimeAi } from '../../ai/SlimeAi'
import { Room, nosync } from 'colyseus'

export class Slime extends AiAgent {

  constructor (id: string, room: Room) {
    super(id, room)
    console.log(`Slime#init ID:${id}`)
    this.ai = new SlimeAi(this)
  }

  public walk (): void {
    this.x += Math.random()
    this.y += Math.random()
  }

  public perform (): void {
    switch (this.getActionToPerform()) {
      case 'walk':
        this.walk()
        break
      default:
        this.talk('waiting')
        break
    }
  }

  public talk (text: string): void {
    // console.log(`Slime#${this.id}: ${text}`)
    this.room.broadcast(`Broadcast@Slime#${this.id}: ${text}`)
  }
}
