export const CANVAS_SIZE = 800
export const CANVAS_CENTER = { x: CANVAS_SIZE / 2, y: CANVAS_SIZE / 2 }

export const defaultParams = {
  radius: 120,
  amplitude: 25,
  frequency: 5,
  zoom: 1,
  strokeWidth: 2,
  pathColor: '#ffffff'
}

export const defaultUI = {
  showGrid: true,
  showNodes: true,
  showHandles: true,
  symmetricEdit: false,
  symmetricalBezier: true
}

export const smoothDragScale = 0.01

export const calculateOptimalNodes = ({ radius, amplitude, frequency }) => {
  const totalNodes = frequency * 4
  const generatedNodes = []

  for (let index = 0; index < totalNodes; index += 1) {
    const theta = (index / totalNodes) * Math.PI * 2
    const wavePhase = frequency * theta
    const r = radius + amplitude * Math.sin(wavePhase)
    const x = CANVAS_CENTER.x + r * Math.cos(theta)
    const y = CANVAS_CENTER.y + r * Math.sin(theta)

    const drByTheta = amplitude * frequency * Math.cos(wavePhase)
    const tangentRadius = drByTheta
    const tangentTheta = r
    const tx = tangentRadius * Math.cos(theta) - tangentTheta * Math.sin(theta)
    const ty = tangentRadius * Math.sin(theta) + tangentTheta * Math.cos(theta)
    const tangentMagnitude = Math.sqrt(tx * tx + ty * ty) || 1
    const normalizedTx = tx / tangentMagnitude
    const normalizedTy = ty / tangentMagnitude
    const handleLength = (2 * Math.PI * r) / (totalNodes * 3)

    generatedNodes.push({
      x,
      y,
      theta,
      handle1: {
        x: x - normalizedTx * handleLength,
        y: y - normalizedTy * handleLength
      },
      handle2: {
        x: x + normalizedTx * handleLength,
        y: y + normalizedTy * handleLength
      },
      symmetryGroup: index % (totalNodes / frequency)
    })
  }

  return generatedNodes
}

export const generatePathFromNodes = (nodeList) => {
  if (!nodeList.length) return ''

  let pathString = `M ${nodeList[0].x} ${nodeList[0].y}`

  for (let index = 0; index < nodeList.length; index += 1) {
    const current = nodeList[index]
    const next = nodeList[(index + 1) % nodeList.length]
    pathString += ` C ${current.handle2.x} ${current.handle2.y}, ${next.handle1.x} ${next.handle1.y}, ${next.x} ${next.y}`
  }

  return pathString
}

export const getSymmetricSiblings = (nodeIndex, nodeList) => {
  const node = nodeList[nodeIndex]
  return nodeList
    .map((candidate, index) => ({ candidate, index }))
    .filter(({ candidate }) => candidate.symmetryGroup === node.symmetryGroup)
    .map(({ index }) => index)
}
