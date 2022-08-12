import React, { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { useInfiniteQuery } from 'react-query';
import { TopNavBar } from '@components';
import { SearchForm, SearchResultAccountItem } from '@components/search';
import { TabsDisplayAccountSum } from '@components/account';
import { fetchGetSearchResult } from '@api';
import { CreateSearchRequest } from '@types';

const Search = () => {
  const [searchParams, setSearchParams] = useState<string | null>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const scrollTopTargetRef = useRef<HTMLDivElement>(null);

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
    if (scrollTopTargetRef.current) {
      scrollTopTargetRef.current.scrollTop = 0;
    }
  };

  const {
    data: searchResult,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ['searchInfinite', searchParams],
    ({ pageParam = 1 }) => {
      const params = searchParams
        ? `${searchParams}&page=${pageParam}`
        : `?page=${pageParam}`;
      return fetchGetSearchResult(params);
    },
    {
      enabled: searchParams !== null,
      getNextPageParam: (lastPage) => lastPage.nextPage,
    }
  );

  const options = {
    root: document.querySelector('.search-result-account-list'),
    rootMargin: '0px',
    threshold: 0.5,
  };

  const onIntersect: IntersectionObserverCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);
        hasNextPage && fetchNextPage();
      }
    });
  };

  useEffect(() => {
    let observer: IntersectionObserver;
    if (targetRef.current) {
      observer = new IntersectionObserver(onIntersect, options);
      observer.observe(targetRef.current);
    }
    return () => observer && observer.disconnect();
  }, [searchResult]);

  return (
    <SearchPageContainer>
      <TopNavBar title="검색" isActiveGoBack />
      <SearchForm onSubmit={handleSubmit} />
      <SearchResultContainer>
        {searchResult && (
          <>
            <TabsDisplayAccountSum
              sumResult={{
                incomeSum: searchResult?.pages[0].incomeSum,
                expenditureSum: searchResult?.pages[0].expenditureSum,
                totalSum: searchResult?.pages[0].totalSum,
              }}
            />
            <SearchResultAccountList
              className="search-result-account-list"
              ref={scrollTopTargetRef}
            >
              {searchResult.pages.map((group, i) => (
                <div key={i}>
                  {group.results.map((item: SingleAccount) => (
                    <SearchResultAccountItem item={item} key={item.id} />
                  ))}
                </div>
              ))}
              {hasNextPage && (
                <InfiniteScrollDiv ref={targetRef}>
                  데이터를 불러오는 중입니다...
                </InfiniteScrollDiv>
              )}
            </SearchResultAccountList>
          </>
        )}
        {searchResult && searchResult.pages[0].results.length === 0 && (
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

  & > p {
    padding: 3rem;
    text-align: center;
  }
`;

const SearchResultContainer = styled.div`
  margin-top: 0.8rem;
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

const InfiniteScrollDiv = styled.div`
  padding: 2rem;
  text-align: center;
  color: ${(props) => props.theme.$gray_dark};
`;
