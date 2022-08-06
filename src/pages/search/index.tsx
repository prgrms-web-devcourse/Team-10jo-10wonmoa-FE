import React from 'react';
import { TopNavBar } from '@components';
import { SearchForm } from '@components/search';

const Search = () => {
  return (
    <>
      <TopNavBar title="검색" isActiveGoBack />
      <SearchForm />
    </>
  );
};

export default Search;
