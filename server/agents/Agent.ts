import { MapState } from '../states'

export abstract class Agent {

  constructor (public id: string) {
    this.id = id
  }

  public abstract simulate (mapState: MapState): void
}
