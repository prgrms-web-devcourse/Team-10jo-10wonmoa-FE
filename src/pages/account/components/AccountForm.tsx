import React from 'react';
import styled from '@emotion/styled';
import { Button } from '@components';

const currentDate = new Date().toLocaleDateString();

const AccountForm = () => {
  return (
    <>
      <form>
        <Input type="text" />
        <input type="date" value={currentDate} />
        <Input type="text" />
        <Input type="text" />
        <Button buttonType="primary" sizeType="large">
          저장하기
        </Button>
      </form>
    </>
  );
};

export default AccountForm;

const Input = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 3rem;
  padding: 1.5rem;
  margin: 0;
  border: none;
  outline: none;
  align-items: center;
  font-size: 1.5rem;
  border-radius: 1.1rem;
  background-color: #f8f9fa;
`;
