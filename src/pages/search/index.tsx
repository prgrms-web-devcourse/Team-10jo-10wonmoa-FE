import React from 'react';
import styled from '@emotion/styled';
import { TopNavBar } from '@components';
import { SearchForm } from '@components/search';
import {
  TabsDisplayAccountSum,
  AccountBookDailyItem,
} from '@components/account';
import { currencyFormatter } from '@utils/formatter';
import { theme } from '@styles';

const ACCOUNT_TYPE = [
  {
    value: currencyFormatter(100000),
    title: '수입',
    color: theme.$blue,
  },
  {
    value: currencyFormatter(10000),
    title: '지출',
    color: theme.$red,
  },
  {
    value: currencyFormatter(90000),
    title: '합계',
  },
];

const MOCKUP_DATA: SingleAccount[] = [
  {
    id: '1',
    type: 'INCOME',
    registerTime: '2022-07-22',
    amount: 10000,
    content: '내용',
    categoryName: '월급',
  },
  {
    id: '2',
    type: 'INCOME',
    registerTime: '2022-07-22',
    amount: 10000,
    content: '내용',
    categoryName: '월급',
  },
  {
    id: '3',
    type: 'INCOME',
    registerTime: '2022-07-22',
    amount: 10000,
    content: '내용',
    categoryName: '월급',
  },
  {
    id: '4',
    type: 'INCOME',
    registerTime: '2022-07-22',
    amount: 10000,
    content: '내용',
    categoryName: '월급',
  },
];

const Search = () => {
  return (
    <SearchPageContainer>
      <TopNavBar title="검색" isActiveGoBack />
      <SearchForm />
      <SearchResultContainer>
        <TabsDisplayAccountSum tabItems={ACCOUNT_TYPE} />
        {MOCKUP_DATA.map((data) => (
          <AccountBookDailyItem item={data} />
        ))}
      </SearchResultContainer>
    </SearchPageContainer>
  );
};

export default Search;

const SearchPageContainer = styled.div`
  background-color: ${(props) => props.theme.$gray_accent};
  width: 100%;
`;

const SearchResultContainer = styled.div`
  margin-top: 1rem;
  background-color: ${(props) => props.theme.$white};
`;
