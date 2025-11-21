import { CANVAS_CENTER, CANVAS_SIZE } from './wavyCircleMath'

const WavyCircleCanvas = ({
  svgRef,
  nodes,
  pathData,
  params,
  ui,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  onMouseLeave
}) => {
  const gridSpacing = 32
  const zoom = params.zoom
  const scaledSpacing = gridSpacing * zoom
  const gridColor = 'color-mix(in srgb, var(--kol-surface-on-primary) 18%, transparent)'
  const quadrantStyle = {
    backgroundImage: `linear-gradient(to right, ${gridColor} 1px, transparent 1px), linear-gradient(to bottom, ${gridColor} 1px, transparent 1px)`,
    backgroundSize: `${scaledSpacing}px ${scaledSpacing}px`,
    opacity: 0.16
  }

  return (
    <div className="relative flex min-h-[480px] flex-1 bg-surface-primary lg:order-1">
      {ui.showGrid && (
        <div className="pointer-events-none absolute inset-0 z-0">
          <div
            className="absolute top-0 left-0 h-1/2 w-1/2"
            style={{ ...quadrantStyle, backgroundPosition: 'bottom right' }}
          />
          <div
            className="absolute top-0 right-0 h-1/2 w-1/2"
            style={{ ...quadrantStyle, backgroundPosition: 'bottom left' }}
          />
          <div
            className="absolute bottom-0 left-0 h-1/2 w-1/2"
            style={{ ...quadrantStyle, backgroundPosition: 'top right' }}
          />
          <div
            className="absolute bottom-0 right-0 h-1/2 w-1/2"
            style={{ ...quadrantStyle, backgroundPosition: 'top left' }}
          />
        </div>
      )}


      {ui.symmetricEdit && (
        <div className="kol-mono-xs absolute right-5 top-5 z-20 rounded bg-[var(--kol-accent-primary-muted)] px-4 py-2 text-[var(--kol-surface-primary)]">
          Symmetric edit mode
        </div>
      )}

      <div className="relative z-10 flex h-full w-full items-center justify-center">
        <svg
          ref={svgRef}
          width="100%"
          height="100%"
          viewBox={`0 0 ${CANVAS_SIZE} ${CANVAS_SIZE}`}
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
          className="h-full w-full border border-auto"
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseLeave}
        >
          {ui.showGrid && (
            <g
              id="axesGroup"
              transform={`translate(${CANVAS_CENTER.x * (1 - params.zoom)}, ${CANVAS_CENTER.y * (1 - params.zoom)}) scale(${params.zoom})`}
            >
              <line
                x1="0"
                y1={CANVAS_CENTER.y}
                x2={CANVAS_SIZE}
                y2={CANVAS_CENTER.y}
                stroke="var(--kol-border-strong)"
                strokeWidth={1}
              />
              <line
                x1={CANVAS_CENTER.x}
                y1="0"
                x2={CANVAS_CENTER.x}
                y2={CANVAS_SIZE}
                stroke="var(--kol-border-strong)"
                strokeWidth={1}
              />
            </g>
          )}

          <g
            id="pathGroup"
            transform={`translate(${CANVAS_CENTER.x * (1 - params.zoom)}, ${CANVAS_CENTER.y * (1 - params.zoom)}) scale(${params.zoom})`}
          >
            <path d={pathData} fill="none" stroke={params.pathColor} strokeWidth={params.strokeWidth} />
          </g>

          <g
            id="handlesGroup"
            transform={`translate(${CANVAS_CENTER.x * (1 - params.zoom)}, ${CANVAS_CENTER.y * (1 - params.zoom)}) scale(${params.zoom})`}
          >
            {ui.showHandles &&
              ui.showNodes &&
              nodes.map((node, index) => (
                <g key={`handle-${index}`}>
                  <line
                    x1={node.x}
                    y1={node.y}
                    x2={node.handle1.x}
                    y2={node.handle1.y}
                    stroke="var(--kol-border-strong)"
                    strokeWidth={1}
                    strokeDasharray="3 3"
                  />
                  <line
                    x1={node.x}
                    y1={node.y}
                    x2={node.handle2.x}
                    y2={node.handle2.y}
                    stroke="var(--kol-border-strong)"
                    strokeWidth={1}
                    strokeDasharray="3 3"
                  />
                  <circle
                    cx={node.handle1.x}
                    cy={node.handle1.y}
                    r="4"
                    className="wavy-handle cursor-move"
                    data-node-index={index}
                    data-handle-type="handle1"
                    fill="var(--kol-accent-primary-muted)"
                    stroke="var(--kol-surface-on-primary)"
                    strokeWidth={1.5}
                  />
                  <circle
                    cx={node.handle2.x}
                    cy={node.handle2.y}
                    r="4"
                    className="wavy-handle cursor-move"
                    data-node-index={index}
                    data-handle-type="handle2"
                    fill="var(--kol-accent-primary-muted)"
                    stroke="var(--kol-surface-on-primary)"
                    strokeWidth={1.5}
                  />
                </g>
              ))}
          </g>

          <g
            id="nodesGroup"
            transform={`translate(${CANVAS_CENTER.x * (1 - params.zoom)}, ${CANVAS_CENTER.y * (1 - params.zoom)}) scale(${params.zoom})`}
          >
            {ui.showNodes &&
              nodes.map((node, index) => (
                <circle
                  key={`node-${index}`}
                  cx={node.x}
                  cy={node.y}
                  r="5"
                  className="wavy-node cursor-move"
                  data-node-index={index}
                  fill="var(--kol-surface-primary)"
                  stroke="var(--kol-surface-on-primary)"
                  strokeWidth={2}
                />
              ))}
          </g>
        </svg>
      </div>
    </div>
  )
}

export default WavyCircleCanvas
