import React from 'react'
import { sankeyLinkHorizontal } from 'd3-sankey'

export default function SankeyLink ({ link, color }) {
  return (
    <path
      d={sankeyLinkHorizontal()(link)}
      style={{
        fill: 'none',
        strokeOpacity: '.3',
        stroke: color,
        strokeWidth: Math.max(1, link.width)
      }}
    />
  )
}
