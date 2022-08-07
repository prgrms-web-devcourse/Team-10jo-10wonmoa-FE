import * as d3 from 'd3';
import styled from '@emotion/styled';

interface Data {
  name: string;
  percent: number;
  total: number;
}

interface ArcData {
  data: Data;
  endAngle: number;
  index: number;
  padAngle: number;
  startAngle: number;
  value: number;
}

interface ArcProp {
  data?: ArcData;
  index?: number;
  createArc?: any;
  colors?: any;
  format?: any;
}

interface PieData {
  data: Data;
  index: number;
  value: number;
  startAngle: number;
  endAngle: number;
}
interface PieProp {
  innerRadius?: number;
  outerRadius?: number;
  //data?: PieData[];
  data?: any;
  colorList?: readonly string[];
}

const Arc: React.FC<ArcProp> = ({ data, index, createArc, colors, format }) => {
  const positionCenter = createArc.centroid(data);
  const positionName = [positionCenter[0] + 0, positionCenter[1] - 8];
  const positionPercent = [positionCenter[0] + 0, positionCenter[1] + 15];

  return (
    <g key={index}>
      <path
        d={createArc(data)}
        fill={colors(index)}
        stroke="white"
        strokeWidth={4}
      />
      <text
        transform={`translate(${positionName})`}
        textAnchor="middle"
        fill="black"
        fontSize="16"
      >
        {data ? data.data.name : null}
      </text>
      <text
        transform={`translate(${positionPercent})`}
        textAnchor="middle"
        fill="white"
        fontSize="12"
      >
        {data ? format(data.value) : null}%
      </text>
    </g>
  );
};

const PieChart: React.FC<PieProp> = ({
  innerRadius = 0,
  outerRadius = 150,
  data,
  colorList,
}) => {
  const createPie = d3.pie<Data>().value((d: Data): number => d.percent);
  const createArc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);
  const colors = d3.scaleOrdinal(colorList);
  const format = d3.format('.1f');
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
  width: 300px;
  height: 300px;
`;
