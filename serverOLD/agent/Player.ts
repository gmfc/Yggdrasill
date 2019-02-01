import { Agent } from './Agent'
import { Client } from 'colyseus'
import { State } from '../state/State'
import { Monster } from './agentInterfaces'

export class Player extends Agent implements Monster {
  x: number = Math.random() * 100
  y: number = Math.random() * 100

  constructor (client: Client) {
    super()
  }

  public simulate (state: State, deltaTime: number) {
    // TODO
  }

  public dispose (state: State) {
    // TODO
  }
}
