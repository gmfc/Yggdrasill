import { Ai } from './u-ai'
import { Slime } from '../agents/Slime'
import { Action } from './u-ai/Action'
import { MapState } from '../states'

export class SlimeAi extends Ai {
  constructor (agent: Slime) {
    super(agent)

    this.addAction('Walk', (action: Action) => {
      action.addScoreFunction('Random Chance', (mapState: MapState, agent: Slime) => {
        return Math.random() * 100
      })

      action.setAction((mapState: MapState, agent: Slime) => {
        agent.talk('Slime Walking')
      })
    })
  }
}