import styled from '@emotion/styled';
import { useState } from 'react';

interface ToggleProps {
  name: string;
  on?: boolean;
  onChange?: () => void;
}

const Toggle = ({ name, on = false, onChange }: ToggleProps) => {
  const [checked, setChecked] = useState(on);

  const handleChange = () => {
    setChecked((prevState) => !prevState);
    onChange && onChange();
  };

  return (
    <ToggleContainer>
      <ToggleInput
        type="checkbox"
        name={name}
        checked={checked}
        onChange={handleChange}
      />
      <ToggleSwitch />
    </ToggleContainer>
  );
};

export default Toggle;

const ToggleContainer = styled.label`
  display: inline-block;
  cursor: pointer;
  user-select: none;
`;

const ToggleSwitch = styled.div`
  width: 4rem;
  height: 1.9rem;
  padding: 0.2rem;
  border-radius: 1rem;
  background-color: ${(props) => props.theme.$gray_medium};
  transition: background-color 0.2 ease-out;
  box-sizing: border-box;
  &:after {
    content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='rgb(175,177,182)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7'%3E%3C/path%3E%3Cpath d='M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z'%3E%3C/path%3E%3C/svg%3E");
    position: relative;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background-color: ${(props) => props.theme.$white};
    transition: left 0.2s ease-out;
  }
`;

const ToggleInput = styled.input`
  display: none;
  &:checked + div {
    background: ${(props) => props.theme.$primary};
  }
  &:checked + div:after {
    content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='rgb(255, 153, 0)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7'%3E%3C/path%3E%3Cpath d='M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z'%3E%3C/path%3E%3C/svg%3E");
    left: calc(100% - 1.5rem);
  }
`;
