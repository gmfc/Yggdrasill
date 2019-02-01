import { UtilityAi } from './UtilityAi'
import { Agent } from '../../agents'
import { State } from '../../states'
import { ActionCallback } from './Action'

export class Ai {
  ai: UtilityAi
  debug: boolean = false
  constructor (public agent: Agent) {
    this.ai = new UtilityAi()
  }

  addAction (description: string, callback: ActionCallback): void {
    this.ai.addAction(description, callback)
  }

  evaluate (wState: State, agent: Agent): void {
    this.ai.evaluate(wState, agent, this.debug).do(wState, agent)
  }
}
