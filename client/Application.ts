import * as PIXI from 'pixi.js'
import { Client, DataChange } from 'colyseus.js'
import $ from 'jquery'
import Viewport from 'pixi-viewport'

const ENDPOINT = `${window.location.protocol.replace('http','ws')}//${window.location.host}`

const WORLD_SIZE = 500

export const lerp = (a: number, b: number, t: number) => (b - a) * t + a

export class Application extends PIXI.Application {
  agents: { [id: string]: PIXI.Graphics } = {}
  currentPlayerEntity: PIXI.Graphics

  client = new Client(ENDPOINT)
  room = this.client.join('map')

  viewport: Viewport

  _axisListener: any
  _interpolation: boolean

  constructor () {
    super({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0x0c0c0c
    })

    this.viewport = new Viewport({
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      worldWidth: WORLD_SIZE,
      worldHeight: WORLD_SIZE
    })

    // draw boundaries of the world
    const boundaries = new PIXI.Graphics()
    boundaries.beginFill(0x000000)
    boundaries.drawRoundedRect(0, 0, WORLD_SIZE, WORLD_SIZE, 30)
    this.viewport.addChild(boundaries)

    // add viewport to stage
    this.stage.addChild(this.viewport)

    this.initialize()
    this.interpolation = true
    $(document).on('keydown',handler => {
      if (this.currentPlayerEntity) {
        this.room.send({ action: 'keydown', input: handler.key })
      }
    })

    // Event Handlers
    // $(document).on('keyup',_.debounce((handler) => {
    //   console.log(handler)

    //   if (this.currentPlayerEntity) {
    //     this.room.send({ action: 'keydown', input: handler.key })
    //   }
    // },100))

    // this.viewport.on('click', (e) => {
    //   if (this.currentPlayerEntity) {
    //     const point = this.viewport.toLocal(e.data.global)
    //     this.room.send(['mouse', { x: point.x, y: point.y }])
    //   }
    // })
  }

  initialize () {
    console.log(`Init`)

    // add / removal of agents
    this.room.listen('agents/:id', (change: DataChange) => {

      if (change.operation === 'add') {
        console.log('add')

        const color = 0xFFFF0B

        const graphics = new PIXI.Graphics()
        graphics.lineStyle(0)
        graphics.beginFill(color, 0.5)
        graphics.drawCircle(0, 0, 10)
        graphics.endFill()

        graphics.x = change.value.x
        graphics.y = change.value.y
        this.viewport.addChild(graphics)

        this.agents[change.path.id] = graphics

        // detecting current user
        if (change.path.id === this.room.sessionId) {
          this.currentPlayerEntity = graphics
          this.viewport.follow(this.currentPlayerEntity)
        }

      } else if (change.operation === 'remove') {
        this.viewport.removeChild(this.agents[change.path.id])
        this.agents[change.path.id].destroy()
        delete this.agents[change.path.id]
      }
    })
  }

  set interpolation (bool: boolean) {
    this._interpolation = bool

    if (this._interpolation) {
      this.room.removeListener(this._axisListener)
      this.loop()

    } else {
      // update agents position directly when they arrive
      this._axisListener = this.room.listen('agents/:id/:axis', (change: DataChange) => {
        this.agents[change.path.id][change.path.axis] = change.value
      }, true)
    }
  }

  loop () {
    for (let id in this.agents) {
      if (this.agents.hasOwnProperty(id)) {
        this.agents[id].x = lerp(this.agents[id].x, this.room.state.agents[id].x, 0.2)
        this.agents[id].y = lerp(this.agents[id].y, this.room.state.agents[id].y, 0.2)
      }
    }

        // continue looping if interpolation is still enabled.
    if (this._interpolation) {
      requestAnimationFrame(this.loop.bind(this))
    }
  }
}
