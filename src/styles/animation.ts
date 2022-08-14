import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const FadeContainer = styled.div`
  animation: ${fadeIn} 0.5s;
  -moz-animation: ${fadeIn} 0.5s; /* Firefox */
  -webkit-animation: ${fadeIn} 0.5s; /* Safari and Chrome */
`;
