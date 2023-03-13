import React, { useMemo } from 'react';
import { scaleSqrt, max } from 'd3';
import { Marks } from './Marks'

const sizeValue = d => d.person_count;
const maxRadius = 15;

export const BubbleMap = ({ data, filteredData, worldAtlas, scaleProportions, width }) => {
  const sizeScale = useMemo(
    () => scaleSqrt()
      .domain([0, max(data, sizeValue)])
      .range([0, maxRadius]),
    [data]
  )

  return (
    <Marks
      worldAtlas={worldAtlas}
      data={filteredData}
      sizeScale={sizeScale}
      sizeValue={sizeValue}
      scaleProportions={scaleProportions}
      width={width}
    />
  )
}