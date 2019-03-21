import mermaid from 'mermaid'

mermaid.initialize({
  theme: 'neutral',
  gantt: { axisFormatter: [
    ['%Y-%m-%d', (d) => {
      return d.getDay() === 1
    }]
  ] }
})