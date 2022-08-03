import React from 'react';
import styled from '@emotion/styled';
import { theme } from '@styles';
import { SingleAccount } from '@hooks/account/useDailyAccount';

interface AccountBookDailyItemProps {
  item: SingleAccount;
}

const colorType = {
  INCOME: theme.$blue,
  EXPENDITURE: theme.$red,
};

const AccountBookDailyItem: React.FC<AccountBookDailyItemProps> = (props) => {
  return (
    <Container>
      <P color={theme.$gray_dark}>{props.item.categoryName}</P>
      <div>
        <P color={theme.$black}>{props.item.content}</P>
        <P color={theme.$gray_medium}>오후 4:30</P>
      </div>
      <P color={colorType[props.item.type]}>{props.item.amount}</P>
    </Container>
  );
};

export default AccountBookDailyItem;

const Container = styled.div(
  {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr 1fr',
    minHeight: '4rem',
    alignItems: 'center',
    margin: '0 2rem',
    '>p:nth-of-type(2)': {
      textAlign: 'right',
    },
  },
  (props) => ({ color: props.color })
);

const P = styled.p(
  {
    fontSize: '1rem',
    paddingTop: '1rem',
  },
  ({ color }) => ({ color, fontSize: '1rem' })
);
