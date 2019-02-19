import { nosync, Room } from 'colyseus'
import { MapState } from '../../states'
import { ActionAgent } from '../abstractions/ActionAgent'

export type AgentAction = {
  action: string,
  input?: string,
  target?: string,
  data?: any
}

export class Player extends ActionAgent {

  @nosync
  private actionToPerform: AgentAction[] = []

  @nosync
  private maxQueueSize: number = 4

  constructor (id: string, room: Room) {
    super(id,room)
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
    return this.actionToPerform.length > 0 ? this.actionToPerform.shift() : { action: 'none',input: 'none',target: 'none' }
  }

  public perform (): void {
    this.goToTarget()
    let { action, data } = this.getActionToPerform()
    switch (action) {
      case 'setTarget':
        this.setTaget(data.x, data.y)
    }
  }

  public simulate (deltaTime: number, mapState: MapState): void {
    console.log(`Player simulate deltaT: ${deltaTime}`)

    this.perform()
  }

}
