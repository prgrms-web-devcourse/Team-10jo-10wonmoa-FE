import React from 'react';
import styled from '@emotion/styled';
import { TopNavBar } from '@components';
import { SearchForm, SearchResultAccountItem } from '@components/search';
import { TabsDisplayAccountSum } from '@components/account';
import { currencyFormatter } from '@utils/formatter';
import { theme } from '@styles';
import { fetchGetSearchResult } from '@api';
import { useQuery } from 'react-query';

const Search = () => {
  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    refetch();
    console.log('submit');
  };

  const { data: searchResult, refetch } = useQuery(
    'search',
    fetchGetSearchResult,
    {
      enabled: false,
      onSuccess: (data) => {
        console.log(data);
      },
    }
  );

  const ACCOUNT_TYPE = [
    {
      value: currencyFormatter(searchResult?.incomeSum ?? 0),
      title: '수입',
      color: theme.$blue,
    },
    {
      value: currencyFormatter(searchResult?.expenditureSum ?? 0),
      title: '지출',
      color: theme.$red,
    },
    {
      value: currencyFormatter(
        searchResult?.incomeSum - searchResult?.expenditureSum ?? 0
      ),
      title: '합계',
    },
  ];

  return (
    <SearchPageContainer>
      <TopNavBar title="검색" isActiveGoBack />
      <SearchForm onSubmit={handleSubmit} />
      <SearchResultContainer>
        {searchResult && (
          <>
            <TabsDisplayAccountSum tabItems={ACCOUNT_TYPE} />
            <SearchResultAccountList>
              {searchResult.results.map((item: SingleAccount) => (
                <SearchResultAccountItem item={item} key={item.id} />
              ))}
            </SearchResultAccountList>
          </>
        )}
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
