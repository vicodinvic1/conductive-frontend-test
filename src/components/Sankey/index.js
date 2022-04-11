import React from 'react'
import * as d3 from 'd3'
import { sankey } from 'd3-sankey'
import chroma from 'chroma-js'

import {
  // POLKASTARTER,
  TOKEN_MINT,
  WALLET_OWNER,
  PANCAKESWAP
} from '../../constants/transfers'

import SankeyLink from './Link'
import SankeyNode from './Node'

function Sankey (props) {
  const { data, width, height } = props

  const linkValues = React.useMemo(
    () => createLinkValues(data),
    [data]
  )

  const sankeyData = {
    nodes: [
      { name: 'TokenMint' },
      { name: 'WalletOwner' },
      { name: 'Polkastarter' },
      { name: 'Pancakeswap' },
      { name: 'Rest' }
    ],
    links: [
      {
        source: 'Polkastarter',
        target: 'TokenMint',
        value: linkValues.polkaStarterToTokenMint.length
      },
      {
        source: 'Polkastarter',
        target: 'Pancakeswap',
        value: linkValues.polkaStarterToPancakeswap.length
      },
      {
        source: 'Polkastarter',
        target: 'WalletOwner',
        value: linkValues.polkaStarterToWalletOwner.length
      },
      {
        source: 'Polkastarter',
        target: 'Rest',
        value: linkValues.polkaStarterToRest.length
      },
      {
        source: 'TokenMint',
        target: 'WalletOwner',
        value: linkValues.tokenMintToWalletOwner.length
      },
      {
        source: 'TokenMint',
        target: 'Pancakeswap',
        value: linkValues.tokenMintToPancakeswap.length
      },
      {
        source: 'TokenMint',
        target: 'Rest',
        value: linkValues.tokenMintToRest.length
      }
    ]
  }

  const { nodes, links } = sankey()
    .nodeId(d => d.name)
    .nodeWidth(15)
    .nodePadding(10)
    .extent([[1, 1], [width - 1, height - 5]])(sankeyData)

  const color = chroma.scale('Set3').classes(nodes.length)
  const colorScale = d3
    .scaleLinear()
    .domain([0, nodes.length])
    .range([0, 1])

  return (
    <svg width={width} height={height}>
      <g style={{ mixBlendMode: 'multiply' }}>
        {nodes.map((node, i) => (
          <SankeyNode
            {...node}
            color={color(colorScale(i)).hex()}
            key={i}
          />
        ))}

        {links.map((link, i) => (
          <SankeyLink
            key={i}
            link={link}
            color={color(colorScale(link.source.index)).hex()}
          />
        ))}
      </g>
    </svg>
  )
}

function createLinkValues (data) {
  const polkaStarterToTokenMint = []
  const polkaStarterToPancakeswap = []
  const polkaStarterToWalletOwner = []
  const polkaStarterToRest = []
  const tokenMintToWalletOwner = []
  const tokenMintToPancakeswap = []
  const tokenMintToRest = []

  data.forEach(item => {
    const { From, To } = item

    if (To === TOKEN_MINT) {
      return polkaStarterToTokenMint.push(item)
    }

    if (To === PANCAKESWAP) {
      return polkaStarterToPancakeswap.push(item)
    }

    if (To === WALLET_OWNER) {
      return polkaStarterToWalletOwner.push(item)
    }

    if (To !== TOKEN_MINT && To !== WALLET_OWNER && To !== PANCAKESWAP) {
      return polkaStarterToRest.push(item)
    }

    if (From === TOKEN_MINT && To === WALLET_OWNER) {
      return tokenMintToWalletOwner.push(item)
    }

    if (From === TOKEN_MINT && To === PANCAKESWAP) {
      return tokenMintToPancakeswap.push(item)
    }

    if (From === TOKEN_MINT && To !== PANCAKESWAP && To !== WALLET_OWNER) {
      return tokenMintToRest.push(item)
    }
  })

  return {
    polkaStarterToTokenMint,
    polkaStarterToPancakeswap,
    polkaStarterToWalletOwner,
    polkaStarterToRest,
    tokenMintToWalletOwner,
    tokenMintToPancakeswap,
    tokenMintToRest
  }
}

export default Sankey
