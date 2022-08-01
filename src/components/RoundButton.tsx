import { theme } from '@styles';
import { ArrowUpCircle, PlusCircle } from 'react-feather';
import styled from '@emotion/styled';

interface ButtonInterface {
  onClickArrow?: (event: React.MouseEvent) => void;
  onClickPlus?: (event: React.MouseEvent) => void;
}

const RoundButton = ({ onClickArrow, onClickPlus }: ButtonInterface) => {
  return (
    <Wrapper>
      <ArrowUpCircle
        stroke={theme.$gray_dark}
        width="3rem"
        height="3rem"
        onClick={onClickArrow}
      />
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

export default RoundButton;

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
