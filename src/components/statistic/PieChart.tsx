import * as d3 from 'd3';
import styled from '@emotion/styled';

interface Data {
  name: string;
  percent: number;
  total: number;
}

interface ArcProp {
  data?: any;
  index?: number;
  createArc?: any;
  colors?: any;
  format?: any;
}

interface PieProp {
  innerRadius?: any;
  outerRadius?: any;
  data?: any;
  colorList?: any;
}

const Arc: React.FC<ArcProp> = ({ data, index, createArc, colors, format }) => {
  return (
    <g key={index} className="arc">
      <path className="arc" d={createArc(data)} fill={colors(index)} />
      <text
        transform={`translate(${createArc.centroid(data)})`}
        textAnchor="middle"
        fill="white"
        fontSize="10"
      >
        {format(data.value)}
      </text>
    </g>
  );
};

const PieChart: React.FC<PieProp> = ({
  innerRadius,
  outerRadius,
  data,
  colorList,
}) => {
  const createPie = d3
    .pie<Data>()
    .value((d) => d.percent)
    .sort(null);

  const createArc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);
  const colors = d3.scaleOrdinal(colorList);
  const format = d3.format('.2f');
  const pieData = createPie(data);

  return (
    <SVG>
      <g transform={`translate(${outerRadius} ${outerRadius})`}>
        {pieData.map((d, i) => (
          <Arc
            key={i}
            index={i}
            data={d}
            createArc={createArc}
            colors={colors}
            format={format}
          />
        ))}
      </g>
    </SVG>
  );
};
export default PieChart;

const SVG = styled.svg`
  width: 100%;
  height: 25rem;
  padding: 5rem 7.7rem;
`;
