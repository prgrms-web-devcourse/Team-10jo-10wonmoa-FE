import React from 'react';
import styled from '@emotion/styled';
import { currencyFormatter } from '@utils/formatter';

const TabsDisplayAccountSum = (props: { sumResult: AccountBookSum }) => {
  return (
    <SumListSection>
      <li>
        <p>수입</p>
        <p> {currencyFormatter(props.sumResult.incomeSum)} 원</p>
      </li>
      <li>
        <p>지출</p>
        <p> {currencyFormatter(props.sumResult.expenditureSum)} 원</p>
      </li>
      <li>
        <p>합계</p>
        <p> {currencyFormatter(props.sumResult.totalSum)} 원</p>
      </li>
    </SumListSection>
  );
};

export default TabsDisplayAccountSum;

const SumListSection = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0.5rem 1rem;
  border-bottom: 5px solid ${(props) => props.theme.$gray_light};

  & li {
    display: flex;
    justify-content: space-between;
    font-weight: 300;
    padding: 0.5rem 0;

    & :first-child {
      font-size: 1rem;
      font-weight: 400;
    }
    & :last-child {
      font-size: 1rem;
    }
  }
`;
