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
import PieChart from '@components/statistic/PieChart';

import type { TabItem } from '@types';
import { STATISTICS_TABS } from '../../constants/Tabs';
import { monthData } from './DummyData';
import * as d3 from 'd3';
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

  const colorList = d3.schemeSet2;
  const { incomes, expenditures } = monthData;

  const [currentTab, setCurrentTab] = useState<TabItem>(STATISTICS_TABS[0]);

  const handleTabClick = (clickedTab: TabItem) => {
    setCurrentTab(clickedTab);
  };

  return (
    <>
      <YearMonthWrapper>
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
      </YearMonthWrapper>

      <div>
        테스트용
        <button onClick={() => setIsMonth(false)}>YEAR</button>
        <button onClick={() => setIsMonth(true)}>MONTH</button>
      </div>

      <TabsWrapper>
        <Tabs tabItems={STATISTICS_TABS} onClick={handleTabClick}>
          <ChartContainer>
            {currentTab.title === '수입' && (
              <PieChart data={incomes} colorList={colorList} />
            )}
            {currentTab.title === '지출' && (
              <PieChart data={expenditures} colorList={colorList} />
            )}
          </ChartContainer>
        </Tabs>
        {currentTab.title === '수입' && (
          <ListWrapper>
            {incomes.map((item, idx) => (
              <StatisticItem
                key={idx}
                percent={item.percent}
                name={item.name}
                total={currencyFormatter(item.total)}
                color={colorList[idx]}
              />
            ))}
          </ListWrapper>
        )}
        {currentTab.title === '지출' && (
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
          </ListWrapper>
        )}
      </TabsWrapper>

      <BottomNavigation />
    </>
  );
};

export default Statistics;

const YearMonthWrapper = styled.div`
  width: 100%;
  height: 5rem;
  display: flex;
  padding-top: 1.5rem;
  padding-left: 1rem;
`;

const ListWrapper = styled.div`
  width: 100%;
  overflow-y: auto;
  border-top: 2rem solid ${theme.$gray_light};
`;

const TabsWrapper = styled.div`
  width: 100%;
`;

const ChartContainer = styled.div`
  width: 100%;
  height: 30rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
