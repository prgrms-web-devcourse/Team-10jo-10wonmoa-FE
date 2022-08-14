import React from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
interface StatisticItemProp {
  percent?: number;
  name?: string;
  total?: number | string;
  color?: string;
}

const StatisticItem: React.FC<StatisticItemProp> = ({
  percent,
  name,
  total,
  color,
}) => {
  const theme = useTheme();
  return (
    <Container theme={theme}>
      <PercentName>
        <Percent color={color}>{Number(percent?.toFixed(1))}%</Percent>
        <CategoryInfo className="name">{name}</CategoryInfo>
      </PercentName>
      <CategoryInfo>{total}원</CategoryInfo>
    </Container>
  );
};

export default StatisticItem;

const Container = styled.div`
  width: 100%;
  padding: 1rem 1rem;
  border-bottom: 0.2rem solid ${(props) => props.theme.$gray_light};
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
`;

const PercentName = styled.div`
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  text-align: center;
  flex-shrink: 0;
`;

const Percent = styled.div`
  width: 4rem;
  height: 2.5rem;
  border: none;
  border-radius: 0.5rem;
  padding-top: 0.5rem;
  text-align: center;
  color: ${(props) => props.theme.$white};
  background-color: ${(props) => props.color};
`;

const CategoryInfo = styled.div`
  color: ${(props) => props.theme.$gray_dark};
  padding-top: 0.5rem;
  flex-shrink: 0;
  &.name {
    padding-left: 3rem;
  }
`;
