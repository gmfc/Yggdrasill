import * as agents from '../agent'
import { EntityMap, Client, Room } from 'colyseus'
import { getMapData, NPCData } from '../data/MapData'
import * as nanoid from 'nanoid'
import { State } from './State'

export class MapState extends State {

  private agents: EntityMap<agents.Agent> = {}
  private vinculatedRoomID: string

  constructor (public map: string, room: Room) {
    super()
    this.vinculatedRoomID = room.roomId
    let mapData = getMapData(map)
    mapData.npcs.forEach(npcGroup => {
      this.populateNPCGroup(npcGroup)
    })
  }

  private populateNPCGroup (npcData: NPCData): void {
    for (let i = 0; i < npcData.number; i++) {
      this.createNPC(npcData.name)
    }
  }

  private createNPC (type: string): void {
    this.agents[nanoid(10)] = new agents[type]()
  }

  public createPlayer (client: Client): void {
    this.agents[client.id] = new agents.Player(client)
  }

  public propagateMessage (client: Client, message: any): void {
        // TODO
  }

  public removeNPC (id: string): void {
    delete this.agents[id]
  }

  public removePlayer (client: Client): void {
    this.agents[client.id].dispose(this)
    delete this.agents[client.id]
  }

  public simulate (deltaTime: number): void {
    for (const id in this.agents) {
      this.agents[id].simulate(this, deltaTime)
    }
  }

  public dispose (): void {
        // TODO
  }

}
