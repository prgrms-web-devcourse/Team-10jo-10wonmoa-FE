import React, { Fragment } from 'react';
import styled from '@emotion/styled';
import StatisticItem from '@components/statistic/StatisticItem';
const Statistics = () => {
  const yearData = {
    year: 2022,
    incomes: [
      {
        name: '월급',
        percent: 50,
        total: 500000,
      },
      {
        name: '주식',
        percent: 30,
        total: 300000,
      },
    ],
    expenditures: [
      {
        name: '식비',
        percent: 50,
        total: 50000,
      },
      {
        name: '패션/미용',
        percent: 30,
        total: 30000,
      },
      {
        name: '교육',
        percent: 20,
        total: 20000,
      },
    ],
  };
  const monthData = {
    year: 2022,
    month: 7,
    incomes: [
      {
        name: '월급',
        percent: 50,
        total: 500000,
      },
      {
        name: '주식',
        percent: 30,
        total: 300000,
      },
    ],
    expenditures: [
      {
        name: '식비',
        percent: 50,
        total: 50000,
      },
      {
        name: '패션/미용',
        percent: 30,
        total: 30000,
      },
      {
        name: '교육',
        percent: 20,
        total: 20000,
      },
    ],
  };
  const colorList = ['red', 'orange', 'yellowgreen', 'green'];
  // const { incomes, expenditures } = yearData;
  const { incomes, expenditures } = monthData;
  return (
    <ListWrapper>
      {expenditures.map((item, idx) => (
        <StatisticItem
          key={idx}
          percent={item.percent}
          name={item.name}
          total={item.total}
          color={colorList[idx]}
        />
      ))}
    </ListWrapper>
  );
};

export default Statistics;

const ListWrapper = styled.div`
  width: 100%;
  margin-top: 2rem;
`;
