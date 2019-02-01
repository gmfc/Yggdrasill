import { State } from '../state/State'
import { Ai } from '../ai'

export abstract class Agent {
  ai: Ai

  isBlocked: boolean

  public tick (): void {
    // TODO
  }

  public abstract simulate (state: State, deltaTime: number): void

  public abstract dispose (state: State): void

}
