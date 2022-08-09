import React from 'react';
import styled from '@emotion/styled';

const ErrorParagraph = ({ text }: { text: string }) => {
  return <StyledErrorParagraph>{text}</StyledErrorParagraph>;
};

export default ErrorParagraph;

const StyledErrorParagraph = styled.p`
  color: ${(props) => props.theme.$red};
`;
