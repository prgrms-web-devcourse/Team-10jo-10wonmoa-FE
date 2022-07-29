import { useCallback } from 'react';
import styled from '@emotion/styled';
import { theme } from '@styles';

interface WrapperInterface {
  width?: number;
}
interface InputInterface {
  labelText?: string;
  width?: number;
  type: string;
  name?: string;
  required?: boolean;
  isValid?: boolean;
  placeholder?: string;
  value?: string | number;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  autoComplete?: string;
}

const Input = ({
  labelText,
  width = 21,
  type,
  name,
  required = true,
  isValid = true,
  placeholder,
  value,
  onChange,
  autoComplete = 'off',
}: InputInterface) => {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange && onChange(e);
    },
    [onChange]
  );

  return (
    <Wrapper width={width}>
      <StyledLabel>{labelText}</StyledLabel>
      <StyledInput
        type={type}
        name={name}
        required={required}
        isValid={isValid}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        autoComplete={autoComplete}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div<WrapperInterface>`
  width: ${({ width }) => `${width}rem`};
  text-align: center;
  color: ${theme.$gray_dark};
`;

const StyledLabel = styled.label`
  color: ${theme.$gray_dark};
  margin-right: 0.8rem;
`;

const StyledInput = styled.input<InputInterface>`
  width: 70%;
  height: 2.5rem;
  border: 0.1rem solid ${theme.$gray_medium};
  padding: 1rem 1rem;
  border-radius: 0.5rem;
  box-sizing: border-box;

  ::placeholder {
    color: ${theme.$gray_medium};
  }
  &:focus {
    border: 0.1rem solid black;
  }
`;

export default Input;
