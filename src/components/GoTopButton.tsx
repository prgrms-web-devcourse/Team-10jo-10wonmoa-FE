import { RefObject, useState } from 'react';
import { theme } from '@styles';
import { ArrowUpCircle } from 'react-feather';
import styled from '@emotion/styled';

const GoTopButton: React.FC<{ topRef?: RefObject<HTMLDivElement> }> = (
  props
) => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    scrolled > 300 ? setVisible(true) : setVisible(false);
  };

  const scrollToTop = () => {
    if (!props.topRef || props.topRef.current === null) return;
    props.topRef?.current.scrollIntoView({ behavior: 'smooth' });
  };

  window.addEventListener('scroll', toggleVisible);

  return (
    <Wrapper visible={visible}>
      <a onClick={scrollToTop}>
        <ArrowUpCircle stroke={theme.$gray_dark} width="3rem" height="3rem" />
      </a>
    </Wrapper>
  );
};

export default GoTopButton;

const Wrapper = styled.div<{ visible: boolean }>`
  position: fixed;
  bottom: 11rem;
  left: calc(50% + 9.2rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
  cursor: pointer;
  /* display: ${(props) => (props.visible ? 'inline' : 'none')}; */
`;
