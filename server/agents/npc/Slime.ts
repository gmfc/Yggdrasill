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

  private walk (): void {
    this.x += 10 - (20 * Math.random())
    this.y += 10 - (20 * Math.random())
  }

  public perform (): void {
    let { action } = this.getActionToPerform()
    if (action === 'walk') {
      this.walk()
    }
  }

  public talk (text: string): void {
    // console.log(`Slime#${this.id}: ${text}`)
    this.room.broadcast(`Broadcast@Slime#${this.id}: ${text}`)
  }
}
