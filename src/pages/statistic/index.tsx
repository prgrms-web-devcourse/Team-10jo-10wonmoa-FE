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

  if (!isLoading && data.length === 0) {
    return <div>데이터가 없습니다</div>;
  }

  const { incomeTotalSum, expenditureTotalSum, incomes, expenditures } = data;

  const makePieData = (consumption: StatisticIncome[]) => {
    const moreThanTenPercent = consumption.filter((x: StatisticIncome) =>
      x.percent >= 10 ? x : null
    );
    const leftPercent =
      100 -
      moreThanTenPercent
        .map((item) => item.percent)
        .reduce((prev, next) => prev + next, 0);
    const ETC =
      leftPercent !== 0 && leftPercent !== 100
        ? {
            name: '기타',
            total: 0,
            percent: Number(leftPercent.toFixed(1)),
          }
        : [];
    const pieData = moreThanTenPercent.concat(ETC);
    return pieData;
  };
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
          <DropDown setIsMonth={setIsMonth} />
        </TopNabMonthWithDropDown>
      </YearMonthWrapper>

      <TabsWrapper>
        <Tabs tabItems={STATISTICS_TABS} onClick={handleTabClick}>
          {currentTab.title === '수입' ? (
            <div>{`수입: ${currencyFormatter(incomeTotalSum)}`}</div>
          ) : (
            <div>{`지출: ${currencyFormatter(expenditureTotalSum)}`}</div>
          )}

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
  height: 30rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
