import React, { useState } from 'react';
import styled from '@emotion/styled';
import StatisticItem from '@components/statistic/StatisticItem';
import {
  Spinner,
  BottomNavigation,
  DropDown,
  TopNavMonthSelector,
  Tabs,
} from '@components';
import { currencyFormatter } from '@utils/formatter';
import { theme } from '@styles';
import { useMonthSelector } from '@hooks';
import PieChart from '@components/statistic/PieChart';
import type { TabItem } from '@types';
import { STATISTICS_TABS } from '../../constants/Tabs';
import * as d3 from 'd3';
import useStatistic from '@hooks/statistics/useStatistic';

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
  const [currentTab, setCurrentTab] = useState<TabItem>(STATISTICS_TABS[0]);
  const handleTabClick = (clickedTab: TabItem) => {
    setCurrentTab(clickedTab);
  };
  const { isLoading, data } = useStatistic();

  if (isLoading) {
    return <Spinner />;
  }

  if (!isLoading && data.length === 0) {
    return <>데이터가 없습니다</>;
  }
  const {
    year,
    month,
    incomeTotalSum,
    expenditureTotalSum,
    incomes,
    expenditures,
  } = data;
  return (
    <>
      <YearMonthWrapper>
        {isMonth ? (
          <TopNavMonthSelector
            date={monthDate}
            onChangePev={handlePrevMonth}
            onChangeNext={handleNextMonth}
          />
        ) : (
          <TopNavMonthSelector
            date={yearDate}
            onChangePev={handlePrevYear}
            onChangeNext={handleNextYear}
          />
        )}
        <DropDown setIsMonth={setIsMonth} />
      </YearMonthWrapper>

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
            {incomes.map((item: StatisticIncome, idx: number) => (
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
            {expenditures.map((item: StatisticIncome, idx: number) => (
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
