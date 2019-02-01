import { Action, ActionCallback } from './Action'
import { State } from '../../states'
import { Agent } from '../../agents/abstractions'

export class UtilityAi {

  private actions: Action[]

  constructor () {
    this.actions = []
  }

    /**
     * Register Action
     * @param description
     * @param callback
     */
  addAction (description: string, callback: ActionCallback) {
    this.actions.push(new Action(description, callback))
  }

    /**
     * Evaluate all actions and return the one with higher score
     * @param worldState
     * @param agent
     * @param debug
     */
  evaluate (worldState: State, agent: Agent, debug: boolean = false): Action {
    return this.actions.reduce((acc, action) => acc.evaluate(worldState, agent, debug) > action.evaluate(worldState, agent, debug) ? acc : action)
  }

}
