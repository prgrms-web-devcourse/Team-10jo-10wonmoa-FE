import React from 'react';
import styled from '@emotion/styled';
import { theme } from '@styles';
import { useNavigate } from 'react-router-dom';
import { currencyFormatter, dateFormatter } from '@utils/formatter';

const colorType = {
  INCOME: theme.$blue,
  EXPENDITURE: theme.$red,
};

interface SearchResultAccountItemProps {
  item: SingleAccount;
}

const SearchResultAccountItem = ({ item }: SearchResultAccountItemProps) => {
  const navigate = useNavigate();
  const accountUpdatePath = `/account/update/${item.type.toLowerCase()}/${
    item.id
  }`;

  return (
    <AccountItemContainer onClick={() => navigate(accountUpdatePath)}>
      <div>{dateFormatter(item.registerTime, 'YEAR_MONTH_DAY_DASH')}</div>
      <AccountItemContentDiv>
        <p>{item.categoryName}</p>
        <p>{item.content}</p>
      </AccountItemContentDiv>
      <AccountItemAmountDiv color={colorType[item.type]}>
        {currencyFormatter(item.amount, true)}
      </AccountItemAmountDiv>
    </AccountItemContainer>
  );
};

export default SearchResultAccountItem;

const AccountItemContainer = styled.div`
  display: flex;
  min-height: 4rem;
  margin: 0 2rem;
  color: ${(props) => props.theme.$gray_dark};
  & > div {
    align-self: center;
  }
`;

const AccountItemContentDiv = styled.div`
  flex-grow: 1;
  padding: 0 1rem;
  & > p:nth-of-type(1) {
    color: ${(props) => props.theme.$black};
  }
  & > p:nth-of-type(2) {
    font-size: 0.9rem;
  }
`;

const AccountItemAmountDiv = styled.div`
  color: ${(props) => props.color};
`;
