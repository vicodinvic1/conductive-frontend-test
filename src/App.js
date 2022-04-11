import React from 'react'
import * as d3 from 'd3'
import './App.css'

import Sankey from './components/Sankey'

import sourceData from './data.csv'

function Application () {
  const [data, setData] = React.useState(null)

  const handleFetchCsvData = React.useCallback(
    async () => setData(await d3.csv(sourceData)),
    []
  )

  React.useEffect(() => {
    handleFetchCsvData()
  }, [])

  return (
    <div id='app'>
      {data
        ? (
          <Sankey
            data={data}
            width={400}
            height={400}
          />
          )
        : 'Loading...'}
    </div>
  )
}

export default Application
