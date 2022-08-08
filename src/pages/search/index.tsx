import React from 'react';
import styled from '@emotion/styled';
import { TopNavBar } from '@components';
import { SearchForm, SearchResultAccountItem } from '@components/search';
import { TabsDisplayAccountSum } from '@components/account';
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
    type: 'EXPENDITURE',
    registerTime: '2022-07-22',
    amount: 10000,
    content: '교통비',
    categoryName: '교통비',
  },
  {
    id: '4',
    type: 'INCOME',
    registerTime: '2022-07-22',
    amount: 10000,
    content: '',
    categoryName: '월급',
  },
  {
    id: '5',
    type: 'INCOME',
    registerTime: '2022-07-22',
    amount: 10000,
    content: '내용',
    categoryName: '월급',
  },
  {
    id: '6',
    type: 'INCOME',
    registerTime: '2022-07-22',
    amount: 10000,
    content: '내용',
    categoryName: '월급',
  },
  {
    id: '7',
    type: 'EXPENDITURE',
    registerTime: '2022-07-22',
    amount: 10000,
    content: '교통비',
    categoryName: '교통비',
  },
  {
    id: '8',
    type: 'INCOME',
    registerTime: '2022-07-22',
    amount: 10000,
    content: '',
    categoryName: '월급',
  },
  {
    id: '9',
    type: 'INCOME',
    registerTime: '2022-07-22',
    amount: 10000,
    content: '내용',
    categoryName: '월급',
  },
  {
    id: '10',
    type: 'INCOME',
    registerTime: '2022-07-22',
    amount: 10000,
    content: '내용',
    categoryName: '월급',
  },
  {
    id: '11',
    type: 'EXPENDITURE',
    registerTime: '2022-07-22',
    amount: 10000,
    content: '교통비',
    categoryName: '교통비',
  },
  {
    id: '12',
    type: 'INCOME',
    registerTime: '2022-07-22',
    amount: 10000,
    content: '',
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
        <SearchResultAccountList>
          {MOCKUP_DATA.map((item) => (
            <SearchResultAccountItem item={item} key={item.id} />
          ))}
        </SearchResultAccountList>
      </SearchResultContainer>
    </SearchPageContainer>
  );
};

export default Search;

const SearchPageContainer = styled.div`
  background-color: ${(props) => props.theme.$gray_accent};
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const SearchResultContainer = styled.div`
  margin-top: 1rem;
  background-color: ${(props) => props.theme.$white};
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
`;

const SearchResultAccountList = styled.div`
  width: 100%;
  overflow-y: scroll;
`;
