import { nosync, Room } from 'colyseus'
import { Agent } from './Agent'

export type AgentAction = {
  action: string,
  input?: string,
  target?: string
}

export abstract class ActionAgent extends Agent {

  @nosync
  private actionToPerform: AgentAction[] = []

  private maxQueueSize: number = 4

  constructor (id: string, room: Room) {
    super(id, room)
  }

  /**
   * Set an action to be performed next tick
   * @param action
   */
  public queueActionToPerform (action: AgentAction): void {
    if (this.actionToPerform.length <= this.maxQueueSize) {
      this.actionToPerform.push(action)
    }
  }

  /**
   * Get the action to be performed next tick
   */
  public getActionToPerform (): AgentAction {
    return this.actionToPerform.length > 0 ? this.actionToPerform.shift() : { action: 'none',input: 'none',target: 'none' }
  }

  /**
   * Perform the action
   */
  public abstract perform (): void
}
