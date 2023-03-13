import { useMemo } from 'react';
import { geoNaturalEarth1, geoPath, geoGraticule } from 'd3';

const projection = geoNaturalEarth1();
const path = geoPath(projection);
const graticule = geoGraticule();

export const Marks = ({ worldAtlas: { land, interiors }, data, sizeScale, sizeValue, scaleProportions, width }) => {
	const scaleTransform = `scale(${scaleProportions}, ${scaleProportions})`
	return (
		<g className="marks" transform={`translate(${(width - (width * scaleProportions)) / 2}, 0)`}>
			{useMemo(
				() => (
					<>
						<path transform={scaleTransform} className="sphere" d={path({ type: 'Sphere' })} />
						<path transform={scaleTransform} className="graticules" d={path(graticule())} />
						{land.features.map((feature, i) => (
							<path key={i} transform={scaleTransform} className="land" d={path(feature)} />
						))}
						<path transform={scaleTransform} className="interiors" d={path(interiors)} />
					</>
				),
				[scaleTransform, land, interiors]
			)}
			{data.map((d, i) => {
				const [x, y] = projection(d.coords);
				return !isNaN(y) && <circle key={i} cx={x * scaleProportions} cy={y * scaleProportions} r={sizeScale(sizeValue(d))} />
			})}
		</g>
	)
}