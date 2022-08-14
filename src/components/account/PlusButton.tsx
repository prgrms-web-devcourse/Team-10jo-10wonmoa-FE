import { theme } from '@styles';
import { PlusCircle } from 'react-feather';
import styled from '@emotion/styled';

interface ButtonInterface {
  onClickPlus?: (event: React.MouseEvent) => void;
}

const PlusButton = ({ onClickPlus }: ButtonInterface) => {
  return (
    <StyledPlusCircle onClick={onClickPlus}>
      <PlusCircle
        fill={theme.$primary}
        stroke={theme.$white}
        width="3.5rem"
        height="3.5rem"
      />
    </StyledPlusCircle>
  );
};

export default PlusButton;

const StyledPlusCircle = styled.a`
  position: absolute;
  right: 1rem;
  bottom: 7rem;
  z-index: 10;
  cursor: pointer;
`;
