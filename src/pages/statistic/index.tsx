import React, { useState } from 'react';
import styled from '@emotion/styled';
import {
  StatisticItem,
  TopNabMonthWithDropDown,
  PieChart,
} from '@components/statistic';
import { BottomNavigation, DropDown, Tabs } from '@components';
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

  const colorList = d3.schemeSet2.concat(d3.schemeSet3).concat(d3.schemePaired);

  const [currentTab, setCurrentTab] = useState<TabItem>(STATISTICS_TABS[0]);
  const handleTabClick = (clickedTab: TabItem) => {
    setCurrentTab(clickedTab);
  };

  const { isLoading, data } = isMonth
    ? useStatistic(monthDate)
    : useStatistic(yearDate);

  const { incomeTotalSum, expenditureTotalSum, incomes, expenditures } = data;

  const incomePieData = incomes && makePieData(incomes);
  const expendituresPieData = expenditures && makePieData(expenditures);
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

      {incomes?.length > 0 || expenditures?.length > 0 ? (
        <TabsWrapper className="fadeIn">
          <Tabs
            tabItems={STATISTICS_TABS}
            initialItem={currentTab}
            onClick={handleTabClick}
            total={
              currentTab.title === '수입'
                ? `${currencyFormatter(incomeTotalSum) || 0}원`
                : `${currencyFormatter(expenditureTotalSum) || 0}원`
            }
          >
            {
              <ChartContainer>
                {currentTab.title === '수입' && incomePieData && (
                  <PieChart data={incomePieData} colorList={colorList} />
                )}
                {currentTab.title === '지출' && expendituresPieData && (
                  <PieChart data={expendituresPieData} colorList={colorList} />
                )}
              </ChartContainer>
            }
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
      ) : !isLoading ? (
        <AccountBookEmpty />
      ) : null}

      <BottomNavigation />
    </>
  );
};

export default Statistics;

const YearMonthWrapper = styled.div`
  width: 100%;
`;

const TabsWrapper = styled.div`
  width: 100%;
  padding-bottom: 7rem;
`;

const ChartContainer = styled.div`
  width: 100%;
  height: 25rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ListWrapper = styled.div`
  width: 100%;
  height: 20rem;
  border-top: 1rem solid ${theme.$gray_light};
  overflow-y: auto;
`;
