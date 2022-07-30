import { theme } from '@styles';
import { ArrowUpCircle, PlusCircle } from 'react-feather';
import styled from '@emotion/styled';

interface ButtonInterface {
  type?: string;
  handleArrow?: (event: React.MouseEvent) => void;
  handlePlus?: (event: React.MouseEvent) => void;
}

const RoundButton: React.FC<ButtonInterface> = ({
  type = 'day',
  handleArrow,
  handlePlus,
}) => {
  return (
    <Wrapper>
      <ArrowUpCircle
        stroke={theme.$gray_dark}
        width="4rem"
        height="4rem"
        onClick={handleArrow}
        display={type === 'month' ? 'none' : 'block'}
      />
      <PlusCircle
        fill={theme.$primary}
        stroke={theme.$white}
        width="4.5rem"
        height="4.5rem"
        onClick={handlePlus}
      />
    </Wrapper>
  );
};

export default RoundButton;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  align-items: center;
  z-index: 10;
  cursor: pointer;
  bottom: 10rem;
  right: 2rem;
`;
