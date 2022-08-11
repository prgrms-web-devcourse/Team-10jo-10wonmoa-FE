import React from 'react';
import styled from '@emotion/styled';

const Title = ({ text }: { text: string }) => {
  return <StyledTitle>{text}</StyledTitle>;
};

export default Title;

const StyledTitle = styled.h2`
  font-size: 2rem;
  font-weight: 500;
`;
