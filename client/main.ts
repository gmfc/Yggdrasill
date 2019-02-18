import { Application } from './Application'

const app = new Application()
document.body.appendChild(app.view)

// allow to resize viewport and renderer
window.onresize = () => {
  app.viewport.resize(window.innerWidth, window.innerHeight)
  app.renderer.resize(window.innerWidth, window.innerHeight)
}

// toggle interpolation
document.addEventListener('click', (e) => {
  const input = e.target as HTMLInputElement

  app.interpolation = input.checked

})
