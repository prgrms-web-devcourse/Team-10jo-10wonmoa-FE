import React from 'react';
import styled from '@emotion/styled';
import { BottomNavigation } from '@components';
import BudgetItem from './components/BudgetItem';
import { currencyFormatter } from '@utils/formatter';
const Budget = () => {
  return (
    <Container>
      <TotalBudgetSection>
        <TotalBudgetTop>
          <h5>한 달 예산</h5>
          <h5>예산설정</h5>
        </TotalBudgetTop>
        <h3>500,000원 남음</h3>
        <ProgressContainer>
          <ProgressBar>
            <Progress percent={30} isOverBudget={false}>
              <Percent>30%</Percent>
            </Progress>
          </ProgressBar>
          <ProgressBarBottom>
            <BudgetDetailList>
              <BudgetDetail>
                <BudgetDetailLabel>총 예산</BudgetDetailLabel>
                <BudgetDetailMoney>
                  {currencyFormatter(1000000)}원
                </BudgetDetailMoney>
              </BudgetDetail>
              <BudgetDetail>
                <BudgetDetailLabel>오늘까지 지출</BudgetDetailLabel>
                <BudgetDetailMoney>
                  {currencyFormatter(500000)}원
                </BudgetDetailMoney>
              </BudgetDetail>
            </BudgetDetailList>
          </ProgressBarBottom>
        </ProgressContainer>
      </TotalBudgetSection>
      <BudgetItemListSection>
        <BudgetItem
          category="식비"
          budget={1000}
          expenditure={1000}
          percent={100}
        />
        <BudgetItem
          category="식비"
          budget={1000}
          expenditure={1000}
          percent={100}
        />
      </BudgetItemListSection>
      <BottomNavigation />
    </Container>
  );
};

export default Budget;

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.$background};
`;

const Section = styled.section`
  width: 100%;
  background-color: ${({ theme }) => theme.$white};
  padding: 1rem 1.5rem;
`;

const TotalBudgetSection = styled(Section)`
  width: 100%;
  background-color: ${({ theme }) => theme.$white};
  padding-bottom: 2rem;
`;

const TotalBudgetTop = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const BudgetItemListSection = styled(Section)`
  position: absolute;
  margin-top: 2rem;
  bottom: 7rem;
  height: 20rem;
  width: 100%;
  background-color: ${({ theme }) => theme.$white};

  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ProgressContainer = styled.div`
  margin-top: 2.5rem;
`;

const Progress = styled.div<{ percent: number; isOverBudget: boolean }>`
  position: relative;
  border-radius: inherit;
  width: ${(props) => props.percent}%;
  height: 100%;
  font-size: 1.25rem;
  background-color: ${(props) =>
    props.isOverBudget ? props.theme.$red : props.theme.$blue};
`;

const Percent = styled.span`
  position: absolute;
  right: 5px;
  top: 2px;
  color: ${({ theme }) => theme.$white};
`;

const ProgressBarBottom = styled.div`
  margin-top: 0.5rem;
  display: flex;
  justify-content: space-between;
`;

const ProgressBar = styled.div`
  position: relative;
  width: 100%;
  border-radius: 6px;

  height: 1.75rem;
  background-color: ${(props) => props.theme.$gray_light};
`;

const BudgetDetailList = styled.ul`
  width: 100%;
  margin-top: 0.5rem;
`;

const BudgetDetail = styled.li`
  display: flex;
  justify-content: space-between;
`;

const BudgetDetailLabel = styled.label`
  font-size: 1rem;
  font-weight: 300;
`;

const BudgetDetailMoney = styled.span`
  font-weight: bold;
`;
