import { Slime } from '../agents/npc/Slime'
import { MapState } from '../states'
import { StaticDie } from '../util'
import { Action, Ai } from './u-ai'

export class SlimeAi extends Ai {
  constructor (agent: Slime) {
    super(agent)

    this.addAction('Walk', (action: Action) => {
      action.addScoreFunction('Random Chance', (mapState: MapState, agent: Slime) => {
        return StaticDie.number
      })

      action.setAction((mapState: MapState, agent: Slime) => {
        agent.queueActionToPerform({ action: 'walk' })
      })
    })

    this.addAction('Wait', (action: Action) => {
      action.addScoreFunction('Random Chance', (mapState: MapState, agent: Slime) => {
        return StaticDie.number
      })

      action.setAction((mapState: MapState, agent: Slime) => {
        agent.queueActionToPerform({ action: 'wait' })
      })
    })

  }
}
