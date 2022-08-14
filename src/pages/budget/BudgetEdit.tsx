import React, { useState } from 'react';
import styled from '@emotion/styled';
import { BottomNavigation, DateSelector, TopNavOutline } from '@components';
import BudgetEditItem from './components/BudgetEditItem';
import { fetchGetBudgetList, fetchPutBudgetItem } from '@api/budget';
import { useMutation, useQuery } from 'react-query';
import debounce from 'lodash/debounce';
import dayjs from 'dayjs';

const BudgetEdit = () => {
  const [currentDate, setTodayDate] = useState(dayjs());
  const dateFormat = currentDate.format('YYYY-MM');

  const { data } = useQuery(['budgetList', currentDate], async () => {
    const { data } = await fetchGetBudgetList(dateFormat);
    return data;
  });

  const { mutate } = useMutation(
    async ({ amount, id }: { amount: number; id: number }) => {
      const response = await fetchPutBudgetItem(dateFormat, id, amount);
      return response.data;
    }
  );
  const handleChangePrev = () => {
    setTodayDate((prevDate) => prevDate.add(-1, 'M'));
  };

  const handleChangeNext = () => {
    setTodayDate((prevDate) => prevDate.add(1, 'M'));
  };

  const debounced = debounce((amount: number, id: number) => {
    mutate({ id, amount });
  }, 1000);

  return (
    <>
      <Container>
        <TopNavOutline>
          <DateSelector
            date={`${currentDate.format('YYYY년 MM월')}`}
            onChangePev={handleChangePrev}
            onChangeNext={handleChangeNext}
          />
        </TopNavOutline>

        <ItemListContainer
          key={`${currentDate.format('YYYY-MM')}`}
          className="fadeIn"
        >
          {data?.budgets.map((budget, index) => (
            <BudgetEditItem
              {...budget}
              key={`${currentDate.format('YYYY-MM')}-${index}`}
              mutateBudget={(amount: number, id: number) => {
                debounced(amount, id);
              }}
            />
          ))}
        </ItemListContainer>
      </Container>
      <BottomNavigation />
    </>
  );
};

export default BudgetEdit;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.$white};
`;

const ItemListContainer = styled.ul`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
`;
