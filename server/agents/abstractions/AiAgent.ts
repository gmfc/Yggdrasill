import { Agent } from './Agent'
import { Ai } from '../../ai/u-ai'
import { MapState, State } from '../../states'
import { nosync, Room } from 'colyseus'
import { ActionAgent } from './ActionAgent'

export abstract class AiAgent extends ActionAgent {

  @nosync
  public ai: Ai

  constructor (id: string, room: Room) {
    super(id, room)
  }

  public simulate (deltaTime: number, mapState: MapState): void {
    // TODO Make something with deltaTime?
    this.ai.evaluate(mapState, this)
    // action now taken by AI
    // this.perform()
  }

  public perform (): void {
    // Nope...
  }
}
