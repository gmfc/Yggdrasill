import { Agent } from './Agent'
import { nosync, Room } from 'colyseus'

export abstract class ActionAgent extends Agent {

  // TODO: Type actionToPerform
  @nosync
  private actionToPerform: any

  constructor (id: string, room: Room) {
    super(id, room)
  }

  public setActionToPerform (message: any): void {
    this.actionToPerform = message
  }

  public getActionToPerform () {
    return this.actionToPerform
  }

  /**
   * Perform an action
   * @param actionToPerform
   */
  public abstract perform (): void
}
