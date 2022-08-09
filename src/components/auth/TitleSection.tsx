import React from 'react';
import styled from '@emotion/styled';

const TitleSection = ({ children }: { children: React.ReactNode }) => {
  return <StyledTitleSection>{children}</StyledTitleSection>;
};
export default TitleSection;

const StyledTitleSection = styled.section`
  width: 20rem;
  margin: 1rem;
`;
