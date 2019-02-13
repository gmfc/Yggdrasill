import { Agent } from './Agent'
import { nosync, Room } from 'colyseus'

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
