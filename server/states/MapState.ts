import { State } from './State'
import { Client, Room, EntityMap, nosync } from 'colyseus'
import * as agentRepository from '../agents/AgentRepository'
import { MapData, getMapData, AgentGroupData } from '../data'
import * as nanoid from 'nanoid'
import { Agent } from '../agents'

export class MapState extends State {

  public agents: EntityMap<Agent>

  @nosync
  private mapData: MapData

  constructor (public mapName: string, public room: Room) {
    super(mapName, room)
    // TODO: getMapData may be async call?
    this.mapData = getMapData(mapName)
    this.mapData.agentGroups.forEach(agenrGroup => {
      this.populateAgentGroup(agenrGroup)
    })
  }

  private populateAgentGroup (agenrGroup: AgentGroupData): void {
    for (let c = 0; c < agenrGroup.number; c++) {
      this.createAgent(agenrGroup.agentName)
    }
  }

  private createAgent (agentName: string): void {
    const agentID = nanoid(10)
    this.agents[agentID] = new agentRepository[agentName](agentID, this.room) as Agent
  }

  /**
   * Game loop tick
   * @param deltaTime elapsed time
   */
  public simulate (deltaTime: number): void {
    for (const id in this.agents) {
      if (this.agents.hasOwnProperty(id)) {
        this.agents[id].simulate(deltaTime, this)
      }
    }
  }

  /**
   * Handle player connection/initialization
   * @param client Player Client
   * @param options
   */
  public onJoin (client: Client, options: any): void {
    // TODO
  }

  /**
   * Message handler
   * @param client client origin
   * @param message message sent
   */
  public onMessage (client: Client, message: any): void {
    // TODO
  }

  /**
   * Handle player exit
   * @param client
   * @param consented
   */
  public onLeave (client: Client, consented: boolean): void {
    // TODO
  }

  /**
   * Called when room expunged
   */
  public onDispose (): void {
    // TODO
  }

}
