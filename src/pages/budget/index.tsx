import React, { useState } from 'react';
import styled from '@emotion/styled';
import { BottomNavigation, DateSelector, TopNavOutline } from '@components';
import BudgetItem from './components/BudgetItem';
import { currencyFormatter } from '@utils/formatter';
import { fetchGetMonthlyBudgetList } from '@api/budget';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

const Budget = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [isMonth] = useState(true);

  const dateFormat = currentDate.format('YYYY-MM');

  const handleChangePrev = () => {
    setCurrentDate((prevDate) => prevDate.add(-1, isMonth ? 'M' : 'y'));
  };

  const handleChangeNext = () => {
    setCurrentDate((prevDate) => prevDate.add(1, isMonth ? 'M' : 'y'));
  };

  const { data } = useQuery(
    ['monthlyBudget', currentDate, isMonth],
    async () => {
      const [year, month] = dateFormat.split('-');
      const response = await fetchGetMonthlyBudgetList({
        year,
        month: isMonth ? month : undefined,
      });
      return response.data;
    }
  );

  return (
    <>
      <TopNavOutline>
        <DateSelector
          date={
            isMonth
              ? currentDate.format('YYYY년 MM월')
              : currentDate.format('YYYY년')
          }
          onChangePev={handleChangePrev}
          onChangeNext={handleChangeNext}
        />
      </TopNavOutline>
      <Container className="fadeIn">
        <TotalBudgetSection>
          <TotalBudgetTop>
            <h5>{isMonth ? '한 달 예산' : '1년 예산'}</h5>
            <Link to="/budget/edit">
              <h6>예산설정</h6>
            </Link>
          </TotalBudgetTop>
          <h3 className="fadeIn" key={dateFormat}>
            {data &&
              `${currencyFormatter(data.amount - data.expenditure, true)} 남음`}
          </h3>
          <ProgressContainer>
            <ProgressBar>
              <Progress
                percent={data ? (data.percent > 100 ? 100 : data.percent) : 0}
                isOverBudget={data ? data.amount < data.expenditure : false}
              >
                <Percent>
                  {data ? (data.percent > 100 ? 100 : data.percent) : 0}%
                </Percent>
              </Progress>
            </ProgressBar>

            <ProgressBarBottom>
              <ul className="fadeIn" key={dateFormat}>
                <li>
                  <label>총 예산</label>
                  <span>{currencyFormatter(data ? data.amount : 0, true)}</span>
                </li>
                <li>
                  <label>오늘까지 지출</label>
                  <span>
                    {currencyFormatter(data ? data.expenditure : 0, true)}
                  </span>
                </li>
              </ul>
            </ProgressBarBottom>
          </ProgressContainer>
        </TotalBudgetSection>

        <BudgetItemListSection>
          <h4>카테고리별 예산</h4>
          <ul className="fadeIn" key={dateFormat}>
            {data?.budgets
              .filter((budget) => budget.amount !== 0)
              .map((budget, index) => (
                <BudgetItem {...budget} key={`${dateFormat}-${index}`} />
              ))}
          </ul>
        </BudgetItemListSection>
      </Container>
      <BottomNavigation />
    </>
  );
};

export default Budget;

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;

  position: relative;
  flex-direction: column;
  background-color: ${({ theme }) => theme.$white};
`;

const Section = styled.section`
  width: 100%;
  background-color: ${({ theme }) => theme.$white};
  border-top: 1px solid ${({ theme }) => theme.$gray_accent};
`;

const TotalBudgetSection = styled(Section)`
  width: 100%;
  padding: 2rem 0;
`;

const TotalBudgetTop = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  h6 {
    color: ${({ theme }) => theme.$primary};
  }
`;

const BudgetItemListSection = styled(Section)`
  padding-top: 2rem;
  padding-bottom: 5rem;
  width: 100%;

  background-color: ${({ theme }) => theme.$white};
  ul {
    width: 100%;
  }
`;

const ProgressContainer = styled.div`
  margin-top: 2.5rem;
`;

const Progress = styled.div<{ percent: number; isOverBudget: boolean }>`
  position: relative;
  border-radius: inherit;
  height: 100%;
  width: ${(props) => props.percent}%;

  background-color: ${(props) =>
    props.isOverBudget ? props.theme.$red : props.theme.$blue};
`;

const Percent = styled.span`
  position: absolute;
  right: 10px;
  top: 2px;
  color: ${({ theme }) => theme.$white};
`;

const ProgressBarBottom = styled.div`
  margin-top: 0.5rem;
  display: flex;
  justify-content: space-between;
  ul {
    width: 100%;
    margin-top: 0.5rem;

    li {
      display: flex;
      justify-content: space-between;
      font-size: ${({ theme }) => theme.$font_xs};
      label {
        font-weight: lighter;
      }
      span {
        font-weight: bold;
      }
    }
  }
`;

const ProgressBar = styled.div`
  position: relative;
  width: 100%;
  border-radius: 8px;
  height: 1.75rem;
  background-color: ${(props) => props.theme.$gray_accent};
`;
