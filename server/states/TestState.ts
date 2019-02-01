import { EntityMap, Client, nosync, Room } from 'colyseus'
import { State } from './abstractions/State'
import { Agent } from '../agents'
import { MapData, getMapData, AgentGroupData } from '../data'
import * as nanoid from 'nanoid'
import * as agentRepository from '../agents/AgentRepository'
import { SimulationCallback } from 'colyseus/lib/Room'

export class TestState extends State {

  public agents: EntityMap<Agent> = {}

  private mapData: MapData

  constructor (public mapName: string, room: Room) {
    super(mapName, room)
    this.mapData = getMapData(mapName)
    this.mapData.agentGroups.forEach(agenrGroup => {
      console.log(`le map`)

      this.populateAgentGroup(agenrGroup)
    })
  }

  private populateAgentGroup (agenrGroup: AgentGroupData): void {
    console.log(`TestState#populateAgentGroup ${agenrGroup}`)

    for (let c = 0; c < agenrGroup.number; c++) {
      this.createAgent(agenrGroup.agentName)
    }

  }

  private createAgent (agentName: string): void {
    const agentID = nanoid(10)
    console.log(`TestState#createAgent ${agentID}`)

    this.agents[agentID] = new agentRepository[agentName](agentID)
  }

  /**
   * Game loop tick
   * @param deltaTime elapsed time
   */
  public simulate (state: State): SimulationCallback {
    console.log(`TestState#simulate`)
    return (num: number): void => {
      // the void
    }

  }

  /**
   * Handle player connection/initialization
   * @param client Player Client
   * @param options
   */
  public onJoin (client: Client, options: any): void {
    console.log(`TestState#join`)

  }

  /**
   * Message handler
   * @param client client origin
   * @param message message sent
   */
  public onMessage (client: Client, message: any): void {
    console.log(`TestState#message`)

  }

  /**
   * Handle player exit
   * @param client
   * @param consented
   */
  public onLeave (client: Client, consented: boolean): void {
    console.log(`TestState#leave`)

  }

  /**
   * Called when room expunged
   */
  public onDispose (): void {
    console.log(`TestState#dispose`)

  }

}
