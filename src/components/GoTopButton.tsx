import { theme } from '@styles';
import { ArrowUpCircle } from 'react-feather';
import styled from '@emotion/styled';

interface ButtonInterface {
  onClickArrow?: (event: React.MouseEvent) => void;
}

const GoTopButton = ({ onClickArrow }: ButtonInterface) => {
  return (
    <Wrapper>
      <a onClick={onClickArrow}>
        <ArrowUpCircle
          stroke={theme.$gray_dark}
          width="3rem"
          height="3rem"
          onClick={onClickArrow}
        />
      </a>
    </Wrapper>
  );
};

export default GoTopButton;

const Wrapper = styled.div`
  position: fixed;
  bottom: 11rem;
  left: calc(50% + 9.2rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
  cursor: pointer;
`;
