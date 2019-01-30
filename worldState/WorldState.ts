import { Agent } from '../agent/Agent'
import { EntityMap, Client, Room } from 'colyseus';
import { getMapData, NPCData } from '../data/MapData';

export class WorldState {

    private agents: EntityMap<Agent> = {}
    private vinculatedRoomID: string

    constructor(public map: string, room: Room) {
        this.vinculatedRoomID = room.roomId
        let mapData = getMapData(map)
        mapData.npcs.forEach(npcGroup => {
            this.populateNPCGroup(npcGroup)
        })
    }

    private populateNPCGroup(npcData: NPCData): void {
        for (let i = 0; i < npcData.number; i++) {
            this.createNPC(npcData.name)
        }
    }

    private createNPC(type: string): void {
        console.log(`Creating ${type}`);

    }

    public createPlayer(client: Client): void {

    }

    public propagateMessage(client: Client, message: any): void { }

    public removePlayer(client: Client): void { }

    public simulate(deltaTime: number): void { }

    public dispose(): void { }

}