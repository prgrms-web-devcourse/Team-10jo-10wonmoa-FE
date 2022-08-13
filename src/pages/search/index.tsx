import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useQuery } from 'react-query';
import { TopNavBar } from '@components';
import { SearchForm, SearchResultAccountItem } from '@components/search';
import { TabsDisplayAccountSum } from '@components/account';
import { fetchGetSearchResult } from '@api';
import { CreateSearchRequest } from '@types';

const Search = () => {
  const [searchParams, setSearchParams] = useState<string | null>(null);

  const handleSubmit = (formValues: CreateSearchRequest) => {
    let parseParams = Object.entries(formValues)
      .filter(
        ([key, values]) =>
          key !== 'categoryNames' &&
          (typeof values === 'number' ? values !== 0 : values.length !== 0)
      )
      .map((param) => param.join('='))
      .join('&');

    parseParams = parseParams.length !== 0 ? `?${parseParams}` : '';
    setSearchParams(parseParams);
  };

  const { data: searchResult } = useQuery(
    ['search', searchParams],
    () => fetchGetSearchResult(searchParams as string),
    {
      enabled: searchParams !== null,
    }
  );

  return (
    <SearchPageContainer>
      <TopNavBar title="검색" isActiveGoBack />
      <SearchForm onSubmit={handleSubmit} />
      <SearchResultContainer>
        {searchResult && (
          <>
            <TabsDisplayAccountSum
              sumResult={{
                incomeSum: searchResult.incomeSum,
                expenditureSum: searchResult.expenditureSum,
                totalSum: searchResult.totalSum,
              }}
            />
            <SearchResultAccountList>
              {searchResult.results?.map((item: SingleAccount) => (
                <SearchResultAccountItem item={item} key={item.id} />
              ))}
            </SearchResultAccountList>
          </>
        )}
        {searchResult && searchResult.results.length === 0 && (
          <SearchNoResultParagraph>
            검색 결과가 존재하지 않습니다
          </SearchNoResultParagraph>
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

const SearchNoResultParagraph = styled.p`
  text-align: center;
  padding: 3rem;
  color: ${(props) => props.theme.$black};
`;
