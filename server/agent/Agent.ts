import { State } from '../state/State'

export abstract class Agent {

  public abstract simulate (state: State, deltaTime: number): void

  public abstract dispose (state: State): void

}
