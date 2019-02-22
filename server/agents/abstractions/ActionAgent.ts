import { nosync, Room } from 'colyseus'
import { MapData } from '../../data'
import { MapState } from '../../states'
import { Agent } from './Agent'

export abstract class ActionAgent extends Agent {

  public x: number = 0

  public y: number = 0

  @nosync
  public targetX: number = 0

  @nosync
  public targetY: number = 0

  @nosync
  public speed = 0

  public color: number = 0x0000FF

  constructor (id: string, room: Room, mapData: MapData) {
    super(id, room, mapData)
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
    const x = this.x - targetX
    const y = this.y - targetY
    const distance = Math.sqrt(x * x + y * y)
    return distance
  }

  public goToTarget (): void {
    const tx = this.targetX - this.x
    const ty = this.targetY - this.y
    const dist = Math.sqrt(tx * tx + ty * ty)

    this.x += (tx / dist) * this.speed
    this.y += (ty / dist) * this.speed
  }

  public fleeTarget (targetX: number, targetY: number) {
    const tx = targetX - this.x
    const ty = targetY - this.y
    const dist = Math.sqrt(tx * tx + ty * ty)

    this.x -= (tx / dist) * this.speed
    this.y -= (ty / dist) * this.speed
  }

}
