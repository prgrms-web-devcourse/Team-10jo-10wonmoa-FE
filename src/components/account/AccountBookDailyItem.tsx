import React from 'react';
import styled from '@emotion/styled';
import { theme } from '@styles';
import { dateFormatter } from '@utils/formatter/dateFormatter';
import { useNavigate } from 'react-router-dom';
import { currencyFormatter } from '@utils/formatter';
const colorType = {
  INCOME: theme.$blue,
  EXPENDITURE: theme.$red,
};

const AccountBookDailyItem: React.FC<{ item: SingleAccount }> = (props) => {
  const navigate = useNavigate();

  return (
    <Container onClick={() => navigate(`/account/update/${props.item.id}`)}>
      <P color={theme.$gray_dark}>{props.item.categoryName}</P>
      <div>
        <P color={theme.$black}>{props.item.content}</P>
        <P color={theme.$gray_medium}>
          {dateFormatter(props.item.registerTime, 'HOUR_MINUTE')}
        </P>
      </div>
      <P color={colorType[props.item.type]}>
        {currencyFormatter(props.item.amount)}
      </P>
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
