import { Agent } from '../agent'
import { EntityMap, Client } from 'colyseus';

export class WorldState {

    agents: EntityMap<Agent> = {}

    constructor(public map:string) {}

    public createPlayer(client:Client):void {

    }

    public propagateMessage(client:Client, message:any):void {}

    public removePlayer(client:Client):void {}

    public simulate(deltaTime: number):void {}

}