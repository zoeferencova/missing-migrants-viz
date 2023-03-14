import { useRef, useEffect, useMemo } from 'react';
import { timeFormat, scaleTime, extent, bin, timeMonths, sum, scaleLinear, max, brushX, select } from 'd3';
import { AxisBottom } from './AxisBottom';
import { AxisLeft } from './AxisLeft';
import { Marks } from './Marks';

const margin = { top: 0, right: 30, bottom: 32, left: 55 };
const xAxisLabelOffset = 30;
const yAxisLabelOffset = 35;
const xAxisTickFormat = timeFormat('%m/%d/%y');
const xAxisLabel = "Month";
const yValue = d => d.person_count;
const yAxisLabel = "Count";

export const DateHistogram = ({ data, height, width, setBrushExtent, xValue }) => {
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const xScale = useMemo(
    () =>
      scaleTime()
        .domain(extent(data, xValue))
        .range([0, innerWidth]),
    [data, xValue, innerWidth]
  );


  const binnedData = useMemo(
    () => {
      const [start, stop] = xScale.domain()
      return bin()
        .value(xValue)
        .domain(xScale.domain())
        .thresholds(timeMonths(start, stop))
        (data)
        .map(array => ({
          y: sum(array, yValue),
          x0: array.x0,
          x1: array.x1
        }))
    },
    [xValue, xScale, data]
  )

  const yScale = useMemo(
    () => scaleLinear()
      .domain([0, max(binnedData, d => d.y)])
      .range([innerHeight, 0])
      .nice(),
    [binnedData, innerHeight]
  )

  const brushRef = useRef();

  useEffect(() => {
    const brush = brushX()
      .extent([[0, 0], [innerWidth, innerHeight]])

    brush(select(brushRef.current));

    brush.on('brush end', event => {
      setBrushExtent(event.selection && event.selection.map(xScale.invert));
    })
  }, [innerWidth, innerHeight, xScale, setBrushExtent]);

  return (
    <>
      <rect
        width={width}
        height={height}
        fill="white"
      />
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisBottom
          xScale={xScale}
          innerHeight={innerHeight}
          tickFormat={xAxisTickFormat}
          tickOffset={8}
        />
        <text
          className="axis-label"
          textAnchor="middle"
          transform={`translate(${-yAxisLabelOffset}, ${innerHeight / 2}) rotate(-90)`}
        >
          {yAxisLabel}
        </text>
        <AxisLeft
          yScale={yScale}
          innerWidth={innerWidth}
          tickOffset={5}
        />
        <text
          className="axis-label"
          x={innerWidth / 2}
          y={innerHeight + xAxisLabelOffset}
          textAnchor="middle"
        >
          {xAxisLabel}
        </text>
        <Marks
          xScale={xScale}
          yScale={yScale}
          binnedData={binnedData}
          innerHeight={innerHeight}
          circleRadius={2}
        />
        <g ref={brushRef}>

        </g>
      </g>
    </>
  )
}