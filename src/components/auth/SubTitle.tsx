import React from 'react';
import styled from '@emotion/styled';
const SubTitle = ({ text }: { text: string }) => {
  return <StyledTitle>{text}</StyledTitle>;
};

export default SubTitle;

const StyledTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 300;
  inline-size: 17rem;
  overflow-wrap: break-word;
  align-items: left;
`;
