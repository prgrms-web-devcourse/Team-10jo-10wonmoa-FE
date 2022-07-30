import React from 'react';
import styled from '@emotion/styled';
import { theme } from '@styles';
import type { SingleAccount } from '@pages/accountBookDaily';
interface AccountBookDailyItemProps {
  item: SingleAccount;
}

const AccountBookDailyItem: React.FC<AccountBookDailyItemProps> = (props) => {
  return (
    <Container>
      <div className="description">{props.item.categoryName}</div>
      <div>
        <p>{props.item.content}</p>
        <p className="description">오후 4:30</p>
      </div>
      <p className={props.item.type === 'INCOME' ? 'income' : 'expenditures'}>
        {props.item.amount}
      </p>
    </Container>
  );
};

export default AccountBookDailyItem;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  align-items: center;

  > * {
    &:nth-child(3) {
      text-align: right;
    }
  }

  .description {
    color: ${theme.$gray_dark};
  }

  .income {
    color: ${theme.$red};
  }

  .expenditures {
    color: ${theme.$blue};
  }
`;
