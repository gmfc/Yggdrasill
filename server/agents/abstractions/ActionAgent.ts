import { nosync, Room } from 'colyseus'
import { MapData } from '../../data'
import { Agent } from './Agent'

export type AgentAction = {
  action: string,
  input?: string,
  target?: string,
  data?: any
}

/**
 * An ActionAgent is an Agent that exists in space and can take actions
 */
export abstract class ActionAgent extends Agent {

  public x: number = 0

  public y: number = 0

  public color: number = 0x0000FF

  @nosync
  private actionToPerform: AgentAction[] = []

  @nosync
  private maxQueueSize: number = 4

  constructor (id: string, room: Room, mapData: MapData) {
    super(id, room, mapData)
  }

  /**
   * Set an action to be performed next tick
   * @param action
   */
  public sendAction (action: AgentAction): void {
    if (this.actionToPerform.length <= this.maxQueueSize) {
      this.actionToPerform.push(action)
    }
  }

  /**
   * Get the action to be performed next tick
   */
  public getActionToPerform (): AgentAction {
    return this.actionToPerform.length > 0 ? this.actionToPerform.shift() : { action: 'none', input: 'none', target: 'none' }
  }

}
