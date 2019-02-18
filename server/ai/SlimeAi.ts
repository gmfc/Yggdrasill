import { Ai, Action } from './u-ai'
import { Slime } from '../agents/npc/Slime'
import { MapState } from '../states'
import { StaticDie } from '../util'

export class SlimeAi extends Ai {
  constructor (agent: Slime) {
    super(agent)

    this.addAction('Walk to target', (action: Action) => {
      action.addScoreFunction('Fixed 50', (mapState: MapState, agent: Slime) => {
        return 50
      })

      action.setAction((mapState: MapState, agent: Slime) => {
        agent.queueActionToPerform({ action: 'goToTarget' })
      })
    })

    this.addAction('Change Target', (action: Action) => {
      action.addScoreFunction('f(targetDistance)', (mapState: MapState, agent: Slime) => {
        return agent.getDistance(agent.targetX, agent.targetY) < 50 ? 120 : 0
      })

      action.setAction((mapState: MapState, agent: Slime) => {
        agent.queueActionToPerform({ action: 'setRandomCoord' })
      })
    })

    this.addAction('Flee', (action: Action) => {
      action.addScoreFunction('f(agentInRange)', (mapState: MapState, agent: Slime) => {
        let nearId = agent.agentInRange(mapState, 10)
        return nearId ? 100 : 0
      })

      action.setAction((mapState: MapState, agent: Slime) => {
        agent.queueActionToPerform({ action: 'fleeNearAgent' })
      })
    })

  }
}
