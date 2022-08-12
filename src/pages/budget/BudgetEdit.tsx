import React from 'react';
import styled from '@emotion/styled';
import { BottomNavigation } from '@components';
import BudgetEditItem from './components/BudgetEditItem';
import { fetchGetBudgetList, fetchPutBudgetItem } from '@api/budget';
import { useMutation, useQuery } from 'react-query';
import debounce from 'lodash/debounce';

const BudgetEdit = () => {
  const today = new Date();
  const todayFullYear = today.getFullYear().toString();
  const todayMonth = (today.getMonth() + 1).toString();
  const dateFormat = `${todayFullYear}-${todayMonth.padStart(2, '0')}`;

  const { data } = useQuery('budgetList2', async () => {
    const { data } = await fetchGetBudgetList(dateFormat);
    return data;
  });

  const { mutate } = useMutation(
    async ({ amount, id }: { amount: number; id: number }) => {
      const response = await fetchPutBudgetItem(dateFormat, id, amount);
      return response.data;
    }
  );

  const debounced = debounce((amount: number, id: number) => {
    mutate({ id, amount });
  }, 1000);

  return (
    <Container>
      <TotalMonthlyBudgetSection>
        <h2>{`${today.getMonth() + 1}월 예산`}</h2>
      </TotalMonthlyBudgetSection>
      {data?.budgets.map((budget, index) => (
        <BudgetEditItem
          {...budget}
          key={index}
          mutateBudget={(amount: number, id: number) => {
            debounced(amount, id);
          }}
        />
      ))}
      <BottomNavigation />
    </Container>
  );
};

export default BudgetEdit;

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.$background};
`;

const TotalMonthlyBudgetSection = styled.section`
  padding: 1rem 1.5rem;
  background-color: ${({ theme }) => theme.$white};
  margin-bottom: 1rem;
`;
