import { Room, Client } from 'colyseus'

export abstract class State {
  constructor (public mapName: string, public mapController: Room) {
    this.mapName = mapName
    this.mapController = mapController
  }

  /**
   * Game loop tick
   * @param deltaTime elapsed time
   */
  public abstract simulate (deltaTime: number): void

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
