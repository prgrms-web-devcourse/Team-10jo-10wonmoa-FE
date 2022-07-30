import { theme } from '@styles';
import { ArrowUpCircle, PlusCircle } from 'react-feather';
import styled from '@emotion/styled';

interface ButtonInterface {
  handleArrow?: (event: React.MouseEvent) => void;
  handlePlus?: (event: React.MouseEvent) => void;
}

const RoundButton: React.FC<ButtonInterface> = ({
  handleArrow,
  handlePlus,
}) => {
  return (
    <Wrapper>
      <ArrowUpCircle
        stroke={theme.$gray_dark}
        width="2.5rem"
        height="2.5rem"
        onClick={handleArrow}
      />
      <PlusCircle
        fill={theme.$primary}
        stroke={theme.$white}
        width="3rem"
        height="3rem"
        onClick={handlePlus}
      />
    </Wrapper>
  );
};

export default RoundButton;

const Wrapper = styled.div`
  width: 3rem;
  height: 7rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: absolute;
  align-items: center;
  z-index: 10;
  cursor: pointer;
  bottom: 10rem;
  right: 2rem;
`;
