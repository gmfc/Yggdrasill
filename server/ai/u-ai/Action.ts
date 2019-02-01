import { State } from '../../states'
import { Agent } from '../../agents'

type BlockingCondition = (wState: State, agent: Agent) => boolean
type ScoreCalculation = (wState: State, agent: Agent) => number
type ActionFunction = (wState: State, agent: Agent) => void
export type ActionCallback = (action: Action) => void

export class Action {

  private scores: Score[]
  private blockingCondition: BlockingCondition
  private actionFunction: ActionFunction
  private prtDebug: boolean = false

    /**
     * Action
     * @param description Actions textual description
     * @param action
     */
  constructor (public description: string, action: ActionCallback) {
    this.description = description
    this.scores = []
    this.blockingCondition = () => true
    this.actionFunction = () => true

    action(this)
  }

    /**
     * Registers a blocking condition
     * @param condition
     */
  setCondition (condition: BlockingCondition) {
    this.blockingCondition = condition
  }

    /**
     * Adds a score function.
     * The score will be added to the total score for this action
     * @param description
     * @param calculationFunction
     */
  addScoreFunction (description: string, calculationFunction: ScoreCalculation) {
    this.scores.push({ description, calculationFunction })
  }

    /**
     * Registers the Action function (the consequence of this Action)
     * @param action Action function
     */
  setAction (action: ActionFunction) {
    this.actionFunction = action
  }

  private _validateScore (score: number) {
    return score
  }

  private log (...msg: string[]): void {
    if (!this.prtDebug) return
    console.log(...msg)
  }

    /**
     * Evaluate all Scores and returns total Action score
     * @param worldState
     * @param agent
     * @param debug
     */
  evaluate (worldState: State, agent: Agent, debug: boolean = false): number {
    this.prtDebug = debug

    this.log(`Evaluating Action: ${this.description} for Agent ${agent.id}`)

    if (!this.blockingCondition(worldState, agent)) {
      this.log(`-- Condition not fulfilled`)
      return -Infinity
    }

    let score: number = this.scores
            .map(score => {
                let localScore = score.calculationFunction(worldState, agent)
                this.log(`-- ${score.description}: ${localScore}`)
                return localScore
            })
            .reduce((acc, score) => acc + score)

    this.log(`-- Final Score ${score}`)

    return score
  }

    /**
     * Action Execution function
     */
  get do () {
    return this.actionFunction
  }
}

interface Score {
  description: string
  calculationFunction: ScoreCalculation
}
