import { Agent } from './Agent'
import { nosync, Room } from 'colyseus'

// TODO: this will replace the message action
export enum AgentActions {
  UP,
  DOWN,
  LEFT,
  RIGHT,
  F1,
  F2,
  F3,
  F4,
  F5,
  F6
}

export abstract class ActionAgent extends Agent {

  // TODO: Type actionToPerform
  @nosync
  private actionToPerform: any

  constructor (id: string, room: Room) {
    super(id, room)
  }

  /**
   * Set an action to be performed next tick
   * @param action
   */
  public setActionToPerform (action: any): void {
    this.actionToPerform = action
  }

  /**
   * Get the action to be performed next tick
   */
  public getActionToPerform () {
    return this.actionToPerform
  }

  /**
   * Perform the action
   */
  public abstract perform (): void
}
