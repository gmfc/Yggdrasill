import { Agent } from './Agent'
import { nosync, Room } from 'colyseus'
import { MapState } from '../../states'

export type AgentAction = {
  action: string,
  input?: string,
  target?: string
}

export abstract class ActionAgent extends Agent {

  @nosync
  public targetX: number = 0

  @nosync
  public targetY: number = 0

  @nosync
  public speed = 2

  @nosync
  private actionToPerform: AgentAction[] = []

  @nosync
  private maxQueueSize: number = 4

  constructor (id: string, room: Room) {
    super(id, room)
  }

  public agentInRange (wState: MapState, range: number): boolean | string {
    for (const id in wState.agents) {
      if (id !== this.id) {
        if (this.getDistance(wState.agents[id].x, wState.agents[id].y) < range) {
          return id
        }
      }
    }
    return false
  }

  public setTaget (targetX: number, targetY: number): void {
    this.targetX = targetX
    this.targetY = targetY
  }

  public getDistance (targetX: number, targetY: number): number {
    let x = this.x - targetX
    let y = this.y - targetY
    let distance = Math.sqrt(x * x + y * y)
    return distance
  }

  public goToTarget (): void {
    let tx = this.targetX - this.x
    let ty = this.targetY - this.y
    let dist = Math.sqrt(tx * tx + ty * ty)

    this.x += (tx / dist) * this.speed
    this.y += (ty / dist) * this.speed
  }

  public fleeTarget (targetX: number, targetY: number) {
    let tx = targetX - this.x
    let ty = targetY - this.y
    let dist = Math.sqrt(tx * tx + ty * ty)

    this.x -= (tx / dist) * this.speed
    this.y -= (ty / dist) * this.speed
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
