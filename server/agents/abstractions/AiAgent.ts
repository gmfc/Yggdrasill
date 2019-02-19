import { nosync, Room } from 'colyseus'
import { Ai } from '../../ai/u-ai'
import { MapState } from '../../states'
import { ActionAgent } from './ActionAgent'
import { MapData } from '../../data';

export abstract class AiAgent extends ActionAgent {

  @nosync
  public ai: Ai

  constructor (id: string, room: Room, mapData: MapData) {
    super(id, room, mapData)
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
