import React from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { theme } from '@styles';
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
      <Percent color={color}>{percent}%</Percent>
      <CategoryInfo>{name}</CategoryInfo>
      <CategoryInfo>{total}</CategoryInfo>
    </Container>
  );
};

export default StatisticItem;

const Container = styled.div`
  width: 100%;
  padding: 1rem 2rem;
  border-bottom: 0.3rem solid ${theme.$gray_light};
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
`;

const Percent = styled.button`
  width: 5rem;
  height: 3rem;
  border: none;
  border-radius: 0.5rem;
  color: ${theme.$white};
  background-color: ${(props) => props.color};
`;

const CategoryInfo = styled.div`
  font-size: 1.5rem;
  color: ${theme.$gray_dark};
  padding-top: 0.2rem;
`;
