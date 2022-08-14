import React from 'react';
import styled from '@emotion/styled';
import { Circle } from 'react-feather';

interface RadioProps {
  value: string;
  name: string;
  isChecked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Radio = ({ value, name, isChecked, onChange }: RadioProps) => {
  return (
    <Wrapper>
      <StyledInput
        type="radio"
        value={value}
        name={name}
        checked={isChecked}
        onChange={onChange}
      />
      {value}
      <Circle stroke="white"></Circle>
    </Wrapper>
  );
};

const Wrapper = styled.label`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  color: ${(props) => props.theme.$gray_dark};
  flex-grow: 1;
`;

const StyledInput = styled.input`
  appearance: none;
  color: ${(props) => props.theme.$primary};
  border: 1.5px solid ${(props) => props.theme.$gray_medium};
  border-radius: 50%;
  width: 1.8rem;
  height: 1.8rem;
  margin-right: 0.5rem;

  &:checked {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='white' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'%3E%3C/circle%3E%3C/svg%3E");
    border-color: transparent;
    background-size: 60% 60%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: ${(props) => props.theme.$primary};
    border-color: ${(props) => props.theme.$primary};
  }
`;

export default Radio;
