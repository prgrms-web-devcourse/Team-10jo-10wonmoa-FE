import { DateSelector } from '@components';
import type { DateSelectorProps } from '@components/DateSelector';
import styled from '@emotion/styled';
import { Search } from 'react-feather';
import { Link } from 'react-router-dom';

interface Props extends DateSelectorProps {
  children: React.ReactNode;
}
const TopNabMonthWithDropDown: React.FC<Props> = (props) => {
  return (
    <NavBarContainer>
      <DateSelector
        date={props.date}
        onChangePev={props.onChangePev}
        onChangeNext={props.onChangeNext}
      />
      <SearchBarContainer>
        {props.children}
        <SearchLink to="/search">
          <Search />
        </SearchLink>
      </SearchBarContainer>
    </NavBarContainer>
  );
};

export default TopNabMonthWithDropDown;

const NavBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 3.6rem;
  width: 100%;
  position: relative;
  top: 0;
  background-color: ${(props) => props.theme.$white};
`;

const SearchBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SearchLink = styled(Link)`
  padding: 1rem;
`;
