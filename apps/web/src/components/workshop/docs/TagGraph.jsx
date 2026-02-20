import { useEffect, useRef, useMemo, useState } from 'react'
import * as d3 from 'd3'
import { useNavigate } from 'react-router-dom'
import { getTagColor } from '../../../utils/docsHelpers'

/**
 * TagGraph - Obsidian-style tag graph
 * All tags shown as interconnected nodes with force-directed layout
 * Lines connect tags that share common docs
 * Draggable nodes, click to navigate
 */
const TagGraph = ({ docs, activeTag, onTagClick, allDocs }) => {
  const svgRef = useRef(null)
  const containerRef = useRef(null)
  const navigate = useNavigate()
  const [dimensions, setDimensions] = useState({ width: 300, height: 300 })
  const [hoveredNode, setHoveredNode] = useState(null)

  // Use allDocs if provided, otherwise fall back to docs
  const sourceDocs = allDocs || docs

  // Compute graph data: ALL tags with connections
  const graphData = useMemo(() => {
    // Collect all tags from ALL docs and their associated docs
    const tagCounts = {}
    const tagToDocs = {} // tag -> set of doc IDs

    sourceDocs.forEach((doc) => {
      const tags = doc.metadata?.tags || []
      tags.forEach((tag) => {
        const tagLower = tag.toLowerCase()
        tagCounts[tagLower] = (tagCounts[tagLower] || 0) + 1
        if (!tagToDocs[tagLower]) {
          tagToDocs[tagLower] = new Set()
        }
        tagToDocs[tagLower].add(doc.id)
      })
    })

    // Create tag nodes
    const nodes = Object.entries(tagCounts)
      .map(([tag, count]) => ({
        id: tag,
        count,
        type: 'tag'
      }))
      .sort((a, b) => b.count - a.count)

    // Create edges: connect tags that share at least one doc
    const edges = []
    const tagList = Object.keys(tagToDocs)
    for (let i = 0; i < tagList.length; i++) {
      for (let j = i + 1; j < tagList.length; j++) {
        const tagA = tagList[i]
        const tagB = tagList[j]
        // Find common docs
        const commonDocs = [...tagToDocs[tagA]].filter(id => tagToDocs[tagB].has(id))
        if (commonDocs.length > 0) {
          edges.push({
            source: tagA,
            target: tagB,
            weight: commonDocs.length
          })
        }
      }
    }

    return { nodes, edges }
  }, [sourceDocs])

  // Update dimensions on resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width } = containerRef.current.getBoundingClientRect()
        const size = Math.max(250, width)
        setDimensions({ width: size, height: size })
      }
    }
    updateDimensions()
    const resizeObserver = new ResizeObserver(updateDimensions)
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }
    return () => resizeObserver.disconnect()
  }, [])

  // Render the force-directed graph
  useEffect(() => {
    if (!svgRef.current || graphData.nodes.length === 0) return

    const { width, height } = dimensions

    // Clear previous
    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove()

    // Create container group
    const g = svg.append('g')

    // Create zoom behavior
    const zoom = d3.zoom()
      .scaleExtent([0.3, 3])
      .on('zoom', (event) => {
        g.attr('transform', event.transform)
      })
    svg.call(zoom)

    // Prepare data with D3-friendly structure
    const nodes = graphData.nodes.map(d => ({ ...d }))
    const links = graphData.edges.map(d => ({ ...d }))

    // Create force simulation
    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id(d => d.id).distance(60).strength(0.5))
      .force('charge', d3.forceManyBody().strength(-150))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(30))

    // Draw edges
    const link = g.append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('stroke', d => {
        // Highlight edges connected to active tag
        if (activeTag && (d.source.id === activeTag || d.target.id === activeTag)) {
          return 'var(--kol-accent-primary)'
        }
        return 'color-mix(in srgb, var(--kol-surface-on-primary) 20%, transparent)'
      })
      .attr('stroke-width', d => {
        if (activeTag && (d.source.id === activeTag || d.target.id === activeTag)) {
          return 2
        }
        return Math.min(2, d.weight * 0.5)
      })
      .attr('opacity', d => {
        if (!activeTag) return 0.6
        return (d.source.id === activeTag || d.target.id === activeTag) ? 1 : 0.2
      })

    // Draw nodes
    const node = g.append('g')
      .attr('class', 'nodes')
      .selectAll('g')
      .data(nodes)
      .enter()
      .append('g')
      .attr('class', 'node')
      .style('cursor', 'pointer')
      .call(d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended))

    // Node circles
    node.append('circle')
      .attr('r', d => Math.max(8, Math.min(16, 6 + d.count * 2)))
      .attr('fill', d => {
        const colorMap = {
          blue: '#49a0a2',
          green: '#66a44c',
          yellow: '#ffe32e',
          red: '#ce4646',
          orange: '#db8000',
          purple: '#9437FF',
          dark: '#3a3a40',
          warm: '#d0d79d'
        }
        return colorMap[getTagColor(d.id)] || '#49a0a2'
      })
      .attr('opacity', d => activeTag && d.id !== activeTag ? 0.4 : 0.9)
      .attr('stroke', d => d.id === activeTag ? 'var(--kol-accent-primary)' : 'none')
      .attr('stroke-width', d => d.id === activeTag ? 2 : 0)

    // Node labels
    node.append('text')
      .text(d => `#${d.id}`)
      .attr('dy', d => Math.max(8, Math.min(16, 6 + d.count * 2)) + 12)
      .attr('text-anchor', 'middle')
      .attr('fill', 'color-mix(in srgb, var(--kol-surface-on-primary) 64%, transparent)')
      .attr('font-family', 'var(--kol-font-family-mono)')
      .attr('font-size', '9px')
      .attr('pointer-events', 'none')

    // Node interactions
    node
      .on('click', (event, d) => {
        event.stopPropagation()
        if (onTagClick) {
          onTagClick(d.id)
        } else {
          navigate(`/workshop/design-system/documentation?tag=${encodeURIComponent(d.id)}`)
        }
      })
      .on('mouseenter', (event, d) => {
        setHoveredNode(d)
        // Highlight connected edges
        link
          .attr('opacity', l => l.source.id === d.id || l.target.id === d.id ? 1 : 0.15)
          .attr('stroke', l => l.source.id === d.id || l.target.id === d.id
            ? 'var(--kol-accent-primary)'
            : 'color-mix(in srgb, var(--kol-surface-on-primary) 20%, transparent)')
      })
      .on('mouseleave', () => {
        setHoveredNode(null)
        link
          .attr('opacity', d => {
            if (!activeTag) return 0.6
            return (d.source.id === activeTag || d.target.id === activeTag) ? 1 : 0.2
          })
          .attr('stroke', d => {
            if (activeTag && (d.source.id === activeTag || d.target.id === activeTag)) {
              return 'var(--kol-accent-primary)'
            }
            return 'color-mix(in srgb, var(--kol-surface-on-primary) 20%, transparent)'
          })
      })

    // Simulation tick
    simulation.on('tick', () => {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y)

      node.attr('transform', d => `translate(${d.x}, ${d.y})`)
    })

    // Drag functions
    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart()
      d.fx = d.x
      d.fy = d.y
    }

    function dragged(event, d) {
      d.fx = event.x
      d.fy = event.y
    }

    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0)
      d.fx = null
      d.fy = null
    }

    // Cleanup
    return () => {
      simulation.stop()
    }
  }, [graphData, dimensions, activeTag, navigate, onTagClick])

  if (graphData.nodes.length === 0) {
    return (
      <div className="text-fg-48 kol-mono-xs py-4 px-2">
        No tags found.
      </div>
    )
  }

  return (
    <div ref={containerRef} className="tag-graph-sidebar">
      <svg
        ref={svgRef}
        width={dimensions.width}
        height={dimensions.height}
        className="tag-graph-svg"
      />
      {hoveredNode && (
        <div className="tag-graph-tooltip">
          #{hoveredNode.id} ({hoveredNode.count} {hoveredNode.count === 1 ? 'doc' : 'docs'})
        </div>
      )}
    </div>
  )
}

export default TagGraph
