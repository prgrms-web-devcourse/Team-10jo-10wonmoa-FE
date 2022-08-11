import React from 'react';
import styled from '@emotion/styled';

const AuthFormWrapper = ({
  children,
  onSubmit,
}: {
  children: React.ReactNode;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}) => {
  return (
    <StyledAuthFormWrapper onSubmit={onSubmit}>
      {children}
    </StyledAuthFormWrapper>
  );
};

export default AuthFormWrapper;

const StyledAuthFormWrapper = styled.form`
  display: flex;
  margin-top: 1rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 20rem;
  & button {
    margin-top: 1rem;
  }
`;
