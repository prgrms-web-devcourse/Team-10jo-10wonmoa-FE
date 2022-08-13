import { RefObject } from 'react';
import { theme } from '@styles';
import { ArrowUpCircle } from 'react-feather';
import styled from '@emotion/styled';

const GoTopButton = <
  T extends {
    topRef: RefObject<HTMLDivElement>;
    isVisible: boolean;
  }
>(
  props: T
) => {
  const scrollToTop = () => {
    if (!props.topRef || props.topRef.current === null) return;
    props.topRef?.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <StyledLink visible={props.isVisible} onClick={scrollToTop}>
      <ArrowUpCircle
        stroke={theme.$white}
        fill={theme.$gray_medium}
        width="3.5rem"
        height="3.5rem"
      />
    </StyledLink>
  );
};

export default GoTopButton;
const StyledLink = styled.a<{ visible: boolean }>`
  position: fixed;
  bottom: -3rem;
  margin: auto 0;
  display: block;
  cursor: pointer;
  transition: transform 0.5s ease-in-out;
  transform: ${({ visible }) =>
    visible ? 'translateY(-9.5rem)' : 'translateY(9.5rem)'};
`;
