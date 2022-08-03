import React, { useState } from 'react';
import styled from '@emotion/styled';
import StatisticItem from '@components/statistic/StatisticItem';
import { currencyFormatter } from '@utils/formatter';
import { theme } from '@styles';
import {
  BottomNavigation,
  DropDown,
  TopNavMonthSelector,
  Tabs,
} from '@components';
import { useMonthSelector } from '@hooks';

import type { TabItem } from '@components/Tabs';
import { STATISTICS_TABS } from '../../constants/Tabs';

const Statistics = () => {
  const {
    monthDate,
    yearDate,
    handlePrevMonth,
    handleNextMonth,
    handleNextYear,
    handlePrevYear,
  } = useMonthSelector();

  const [isMonth, setIsMonth] = useState(true);
  /**
   * 임시 목업 데이터
   * */
  // const yearData = {
  //   year: 2022,
  //   incomes: [
  //     {
  //       name: '월급',
  //       percent: 50,
  //       total: 500000,
  //     },
  //     {
  //       name: '주식',
  //       percent: 30,
  //       total: 300000,
  //     },
  //   ],
  //   expenditures: [
  //     {
  //       name: '식비',
  //       percent: 50,
  //       total: 50000,
  //     },
  //     {
  //       name: '패션/미용',
  //       percent: 30,
  //       total: 30000,
  //     },
  //     {
  //       name: '교육',
  //       percent: 20,
  //       total: 20000,
  //     },
  //   ],
  // };
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

  const { expenditures } = monthData;

  const [currentTab, setCurrentTab] = useState<TabItem>(STATISTICS_TABS[0]);

  const handleTabClick = (clickedTab: TabItem) => {
    setCurrentTab(clickedTab);
  };

  return (
    <>
      {isMonth ? (
        <TopNavMonthSelector
          date={monthDate}
          onChangePrevMonth={handlePrevMonth}
          onChangeNextMonth={handleNextMonth}
        />
      ) : (
        <TopNavMonthSelector
          date={yearDate}
          onChangePrevMonth={handlePrevYear}
          onChangeNextMonth={handleNextYear}
        />
      )}

      <DropDown />
      <div>
        <button>수입</button>
        <button>지출</button>
      </div>
      <div>
        테스트용
        <button onClick={() => setIsMonth(false)}>YEAR</button>
        <button onClick={() => setIsMonth(true)}>MONTH</button>
      </div>

      <TabsWrapper>
        <Tabs tabItems={STATISTICS_TABS} onClick={handleTabClick}>
          <ChartContainer>
            {currentTab.title === '수입' && <div>수입차트</div>}
            {currentTab.title === '지출' && <h1>지출차트</h1>}
          </ChartContainer>
        </Tabs>
      </TabsWrapper>

      <ListWrapper>
        {expenditures.map((item, idx) => (
          <StatisticItem
            key={idx}
            percent={item.percent}
            name={item.name}
            total={currencyFormatter(item.total)}
            color={colorList[idx]}
          />
        ))}
        {expenditures.map((item, idx) => (
          <StatisticItem
            key={idx}
            percent={item.percent}
            name={item.name}
            total={currencyFormatter(item.total)}
            color={colorList[idx]}
          />
        ))}
        {expenditures.map((item, idx) => (
          <StatisticItem
            key={idx}
            percent={item.percent}
            name={item.name}
            total={currencyFormatter(item.total)}
            color={colorList[idx]}
          />
        ))}
      </ListWrapper>
      <BottomNavigation />
    </>
  );
};

export default Statistics;

const ListWrapper = styled.div`
  width: 100%;
  height: 40rem;
  overflow-y: scroll;
  border-top: 2rem solid ${theme.$gray_light};
`;

const TabsWrapper = styled.div`
  width: 100%;
  height: rem;
`;

const ChartContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
