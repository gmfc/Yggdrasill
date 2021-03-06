import { Slime } from '../agents/npc/Slime'
import { MapState } from '../states'
import { StaticDie } from '../util'
import { Action, Ai } from './u-ai'

export class SlimeAi extends Ai {
  constructor (agent: Slime) {
    super(agent)

    this.addAction('Walk to target', (action: Action) => {
      action.addScoreFunction('Fixed 50', (mapState: MapState, agent: Slime) => {
        return 50
      })

      action.setAction((mapState: MapState, agent: Slime) => {
        agent.speed = 2
        agent.goToTarget()
      })
    })

    this.addAction('Change Target', (action: Action) => {
      action.addScoreFunction('f(targetDistance)', (mapState: MapState, agent: Slime) => {
        return agent.getDistance(agent.targetX, agent.targetY) < 50 ? 120 : 0
      })

      action.setAction((mapState: MapState, agent: Slime) => {
        let tx = StaticDie.number * agent.mapData.size
        let ty = StaticDie.number * agent.mapData.size
        agent.setTaget(tx,ty)
      })
    })

    this.addAction('Flee', (action: Action) => {
      let nearId: string | boolean = false
      action.addScoreFunction('f(agentInRange)', (mapState: MapState, agent: Slime) => {
        nearId = agent.agentInRange(mapState, 20)
        return nearId ? 100 : 0
      })

      action.setAction((mapState: MapState, agent: Slime) => {
        if (typeof nearId === 'string') {
          agent.speed = 5
          agent.fleeTarget(mapState.agents[nearId].x, mapState.agents[nearId].y)
        }
      })
    })

  }
}
