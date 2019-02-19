import { Client, nosync, Room } from 'colyseus'
import { SimulationCallback } from 'colyseus/lib/Room'

export abstract class State {

  public mapName: string

  @nosync
  public room: Room

  constructor (mapName: string, room: Room) {
    this.mapName = mapName
    this.room = room
  }

  /**
   * Game loop tick
   * @param deltaTime elapsed time
   */
  public abstract simulate (state: State): SimulationCallback

  /**
   * Handle player connection/initialization
   * @param client Player Client
   * @param options
   */
  public abstract onJoin (client: Client, options: any): void

  /**
   * Message handler
   * @param client client origin
   * @param message message sent
   */
  public abstract onMessage (client: Client, message: any): void

  /**
   * Handle player exit
   * @param client
   * @param consented
   */
  public abstract onLeave (client: Client, consented: boolean): void

  /**
   * Called when room expunged
   */
  public abstract onDispose (): void

}
