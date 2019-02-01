import { State } from './State'
import { Client, Room } from 'colyseus'

export class MapState extends State {

  constructor (public mapName: string, public roomHandler: Room) {
    super(mapName, roomHandler)
  }

  /**
   * Game loop tick
   * @param deltaTime elapsed time
   */
  public simulate (deltaTime: number): void {
    // TODO
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
