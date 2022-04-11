import React from 'react'

export default function SankeyNode (props) {
  const { name, x0, x1, y0, y1, color } = props

  return (
    <>
      <rect
        x={x0}
        y={y0}
        width={x1 - x0}
        height={y1 - y0}
        fill={color}
      />

      <text
        x={x0 + x1 - x0}
        y={(y1 - y0) / 2}
      >
        {name}
      </text>
    </>
  )
}
