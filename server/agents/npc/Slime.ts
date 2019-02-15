import { AiAgent } from '../abstractions/AiAgent'
import { SlimeAi } from '../../ai/SlimeAi'
import { Room, nosync } from 'colyseus'

export class Slime extends AiAgent {

  constructor (id: string, room: Room) {
    super(id, room)
    console.log(`Slime#init ID:${id}`)
    this.ai = new SlimeAi(this)
    this.x = 150
    this.y = 150
  }

  public walk (): void {
    this.x += 1 - (2 * Math.random())
    this.y += 1 - (2 * Math.random())
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
