import { DateSelector } from '@components';
import type { DateSelectorProps } from '@components/DateSelector';
import styled from '@emotion/styled';
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
      {props.children}
    </NavBarContainer>
  );
};

export default TopNabMonthWithDropDown;

const NavBarContainer = styled.div`
  display: flex;
  padding-right: 4rem;
  justify-content: space-between;
  width: 100%;
  position: relative;
  top: 0;
`;
