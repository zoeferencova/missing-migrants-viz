import { useState, useEffect } from 'react';
import { csv } from 'd3';

const csvUrl =
  'https://gist.githubusercontent.com/zoeferencova/52c923a28eda22e22705ad30a39eff40/raw/missing_migrants_data.csv';

const row = d => {
  d.coords = [+d.lng, +d.lat]
  d.person_count = +d.person_count;
  d.date = new Date(d.date)
  return d;
}

export const useData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    csv(csvUrl, row).then(setData)
  }, []);

  return data;
}