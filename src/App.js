import React, { useState } from 'react';
import { useWorldAtlas } from './hooks/useWorldAtlas'
import { useData } from './hooks/useData'
import { BubbleMap } from './components/BubbleMap/index.js'
import { DateHistogram } from './components/DateHistogram/index.js'

const width = 960;
const height = 500;
const dateHistogramSize = 0.22;

const xValue = d => d.date;

export const App = () => {
  const data = useData();
  const worldAtlas = useWorldAtlas();

  const [brushExtent, setBrushExtent] = useState();

  if (!worldAtlas || !data) {
    return <pre>"Loading..."</pre>;
  }

  const filteredData = brushExtent ? data.filter(d => {
    const date = xValue(d);
    return date > brushExtent[0] && date < brushExtent[1];
  }) : data;

  return (
    <svg width={width} height={height}>
      <g>
        <BubbleMap
          data={data}
          filteredData={filteredData}
          worldAtlas={worldAtlas}
          scaleProportions={1 - dateHistogramSize}
          width={width}
        />
        <g transform={`translate(0, ${height - dateHistogramSize * height})`}>
          <DateHistogram
            data={data}
            height={dateHistogramSize * height}
            width={width}
            setBrushExtent={setBrushExtent}
            xValue={xValue}
          />
        </g>
      </g>
    </svg>
  );
};
