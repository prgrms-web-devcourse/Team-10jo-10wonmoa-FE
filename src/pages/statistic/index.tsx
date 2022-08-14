import React, { useState } from 'react';
import styled from '@emotion/styled';
import {
  StatisticItem,
  TopNabMonthWithDropDown,
  PieChart,
} from '@components/statistic';
import { Spinner, BottomNavigation, DropDown, Tabs } from '@components';
import { currencyFormatter } from '@utils/formatter';
import { theme } from '@styles';
import { useMonthSelector } from '@hooks';
import type { TabItem } from '@types';
import { STATISTICS_TABS } from '../../constants/Tabs';
import * as d3 from 'd3';
import useStatistic from '@hooks/statistics/useStatistic';
import type { DateSelectorProps } from '@components/DateSelector';
import { makePieData } from './makePieData';
import { AccountBookEmpty } from '@components/account';
const Statistics = () => {
  const {
    monthDate,
    yearDate,
    handlePrevMonth,
    handleNextMonth,
    handleNextYear,
    handlePrevYear,
  } = useMonthSelector();

  type MonthYearTypes = 'month' | 'year';

  const [isMonth, setIsMonth] = useState(true);

  const dateSelectorHandlers: Record<MonthYearTypes, DateSelectorProps> = {
    month: {
      date: monthDate,
      onChangePev: handlePrevMonth,
      onChangeNext: handleNextMonth,
    },
    year: {
      date: yearDate,
      onChangePev: handlePrevYear,
      onChangeNext: handleNextYear,
    },
  };

  const colorList = d3.schemeSet2;
  const [currentTab, setCurrentTab] = useState<TabItem>(STATISTICS_TABS[0]);
  const handleTabClick = (clickedTab: TabItem) => {
    setCurrentTab(clickedTab);
  };

  const { isLoading, data } = isMonth
    ? useStatistic(monthDate)
    : useStatistic(yearDate);

  if (isLoading) {
    return <Spinner />;
  }
  const { incomeTotalSum, expenditureTotalSum, incomes, expenditures } = data;

  const incomePieData = makePieData(incomes);
  const expendituresPieData = makePieData(expenditures);

  return (
    <>
      <YearMonthWrapper>
        <TopNabMonthWithDropDown
          date={
            isMonth
              ? dateSelectorHandlers['month'].date
              : dateSelectorHandlers['year'].date
          }
          onChangePev={
            isMonth
              ? dateSelectorHandlers['month'].onChangePev
              : dateSelectorHandlers['year'].onChangePev
          }
          onChangeNext={
            isMonth
              ? dateSelectorHandlers['month'].onChangeNext
              : dateSelectorHandlers['year'].onChangeNext
          }
        >
          <DropDown
            setIsMonth={setIsMonth}
            initialMenu={isMonth ? '월별' : '연별'}
          />
        </TopNabMonthWithDropDown>
      </YearMonthWrapper>
      {incomes.length > 0 || expenditures.length > 0 ? (
        <TabsWrapper>
          <Tabs
            tabItems={STATISTICS_TABS}
            onClick={handleTabClick}
            total={
              currentTab.title === '수입'
                ? currencyFormatter(incomeTotalSum)
                : currencyFormatter(expenditureTotalSum)
            }
          >
            <ChartContainer>
              {currentTab.title === '수입' && (
                <PieChart data={incomePieData} colorList={colorList} />
              )}
              {currentTab.title === '지출' && (
                <PieChart data={expendituresPieData} colorList={colorList} />
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
      ) : (
        <AccountBookEmpty />
      )}

      <BottomNavigation />
    </>
  );
};

export default Statistics;

const YearMonthWrapper = styled.div`
  min-width: 100%;
  padding-top: 1.5rem;
  padding-left: 1rem;
`;

const ListWrapper = styled.div`
  width: 100%;
  height: 35rem;
  overflow-y: auto;
  border-top: 2rem solid ${theme.$gray_light};
`;

const TabsWrapper = styled.div`
  width: 100%;
`;

const ChartContainer = styled.div`
  width: 100%;
  height: 25rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Test = styled.div`
  background-color: pink;
  height: 20rem;
  width: 40rem;
`;
