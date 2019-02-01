import { Agent } from './Agent'
import { Ai } from '../../ai/u-ai'
import { MapState } from '../../states'
import { nosync } from 'colyseus'

export abstract class AiAgent extends Agent {

  @nosync
  public ai: Ai

  constructor (public id: string) {
    super(id)
  }

  public simulate (deltaTime: number, mapState: MapState): void {
    // TODO Make something with deltaTime?
    this.ai.evaluate(mapState, this)
  }
}
