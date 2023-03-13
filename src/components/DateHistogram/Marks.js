export const Marks = ({ binnedData, xScale, yScale, innerHeight }) => (
	<g className="marks">
		{binnedData.map((d, i) => (
			<rect
				key={i}
				x={xScale(d.x0)}
				y={yScale(d.y)}
				width={xScale(d.x1) - xScale(d.x0)}
				height={innerHeight - yScale(d.y)}
			>
				<title>{d.y}</title>
			</rect>
		))}
	</g>
)