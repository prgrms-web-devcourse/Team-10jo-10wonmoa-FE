import { theme } from '@styles';
import { PlusCircle } from 'react-feather';
import styled from '@emotion/styled';

interface ButtonInterface {
  onClickPlus?: (event: React.MouseEvent) => void;
}

const PlusButton = ({ onClickPlus }: ButtonInterface) => {
  return (
    <Wrapper>
      <a onClick={onClickPlus}>
        <PlusCircle
          fill={theme.$primary}
          stroke={theme.$white}
          width="3.5rem"
          height="3.5rem"
        />
      </a>
    </Wrapper>
  );
};

export default PlusButton;

const Wrapper = styled.div`
  position: fixed;
  bottom: 7rem;
  left: calc(50% + 9rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
  cursor: pointer;
`;
