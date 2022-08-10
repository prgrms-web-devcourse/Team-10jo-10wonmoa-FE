import styled from '@emotion/styled';
import { TopNavOutline, DateSelector } from '@components';
import type { DateSelectorProps } from '@components/DateSelector';
import { Search } from 'react-feather';
import { Link } from 'react-router-dom';

const TopNavMonthSelector = <
  T extends DateSelectorProps & { isShowSearch?: boolean }
>(
  props: T
) => {
  return (
    <TopNavOutline>
      <DateSelector
        date={props.date}
        onChangePev={props.onChangePev}
        onChangeNext={props.onChangeNext}
      />
      <SearchLink to="/search">
        <Search />
      </SearchLink>
    </TopNavOutline>
  );
};

export default TopNavMonthSelector;

const SearchLink = styled(Link)`
  padding: 1rem;
`;
