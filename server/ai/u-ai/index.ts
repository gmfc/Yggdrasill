import { UtilityAi } from './UtilityAi'
import { Agent } from '../../agents/abstractions'
import { State } from '../../states'
import { ActionCallback } from './Action'
import { nosync } from 'colyseus'

export class Ai {
  @nosync
  ai: UtilityAi

  @nosync
  debug: boolean = false

  @nosync
  agent: Agent

  constructor (agent: Agent) {
    this.ai = new UtilityAi()
    this.agent = agent
  }

  addAction (description: string, callback: ActionCallback): void {
    this.ai.addAction(description, callback)
  }

  evaluate (wState: State, agent: Agent): void {
    this.ai.evaluate(wState, agent, this.debug).do(wState, agent)
  }
}

export { Action } from './Action'
