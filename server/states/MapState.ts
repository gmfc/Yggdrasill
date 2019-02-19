import { Client, EntityMap, nosync, Room } from 'colyseus'
import { SimulationCallback } from 'colyseus/lib/Room'
import * as nanoid from 'nanoid'
import * as agents from '../agents'
import { ActionAgent } from '../agents/abstractions/ActionAgent'
import { Player, AgentAction } from '../agents/player/Player'
import { AgentGroupData, getMapData, MapData } from '../data'
import { State } from './abstractions/State'

export class MapState extends State {

  public agents: EntityMap<ActionAgent | Player> = {}

  @nosync
  private mapData: MapData

  @nosync
  private populated: boolean = false

  constructor (public mapName: string, room: Room) {

    super(mapName, room)
    console.log(`MapStateCreate`)
    // TODO: getMapData may be async call?
    this.mapData = getMapData(mapName)
    this.populateAgents()

  }

  private populateAgents (): void {
    console.log(`Populating...`)
    this.populated = true
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
    this.agents[agentID] = new agents[agentName](agentID, this.room)
  }

  /**
   * Game loop tick
   * Foul Wizardry and black magic
   *
   * This function returns the simulation function with the scope fixed, i think.
   * That solved a preety confusing bug that instancialized 4(?) MapCoomControllers for
   * some reason.
   *
   */
  public simulate (mapState: MapState): SimulationCallback {
    return (deltaTime: number): void => {
      for (let id in mapState.agents) {
        if (mapState.agents.hasOwnProperty(id)) {
          mapState.agents[id].simulate(deltaTime, mapState)
        }
      }
    }
  }

  /**
   * Handle player connection/initialization
   * @param client Player Client
   * @param options
   */
  public onJoin (client: Client, options: any): void {
    this.agents[client.sessionId] = new Player(client.sessionId, this.room)
    // TODO
  }

  /**
   * Message handler
   * @param client client origin
   * @param message message sent
   */
  public onMessage (client: Client, action: AgentAction): void {
    this.agents[client.sessionId].sendAction(action)
  }

  /**
   * Handle player exit
   * @param client
   * @param consented
   */
  public onLeave (client: Client, consented: boolean): void {
    delete this.agents[client.sessionId]
    // TODO
  }

  /**
   * Called when room expunged
   */
  public onDispose (): void {
    // TODO
  }

}
