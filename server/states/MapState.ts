import { State } from './abstractions/State'
import { Client, Room, EntityMap, nosync } from 'colyseus'
import * as agents from '../agents'
import { MapData, getMapData, AgentGroupData } from '../data'
import * as nanoid from 'nanoid'
import { SimulationCallback } from 'colyseus/lib/Room'
import { Player } from '../agents/player/Player'
import { ActionAgent, AgentAction } from '../agents/abstractions/ActionAgent'

export class MapState extends State {

  public agents: EntityMap<ActionAgent> = {}

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
    console.log(`MapState#onJoin ${client.sessionId}`)
    this.agents[client.sessionId] = new Player(client.sessionId, this.room)
    // TODO
  }

  /**
   * Message handler
   * @param client client origin
   * @param message message sent
   */
  public onMessage (client: Client, action: AgentAction): void {
    this.agents[client.sessionId].queueActionToPerform(action)
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
