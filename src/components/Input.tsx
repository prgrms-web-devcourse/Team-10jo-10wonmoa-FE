import { useCallback } from 'react';
import styled from '@emotion/styled';

interface WrapperInterface {
  width?: number;
}
interface InputInterface {
  labelText?: string;
  type: string;
  name?: string;
  required?: boolean;
  isValid?: boolean;
  placeholder?: string;
  value?: string | number;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  autoComplete?: string;
  isError?: boolean;
}
const Input = ({
  labelText,
  type,
  name,
  required = true,
  isValid = true,
  placeholder,
  value,
  onChange,
  autoComplete = 'off',
  isError,
}: InputInterface) => {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange && onChange(e);
    },
    [onChange]
  );

  return (
    <Wrapper>
      {labelText ? <StyledLabel>{labelText}</StyledLabel> : ''}
      <StyledInput
        labelText={labelText}
        type={type}
        name={name}
        required={required}
        isValid={isValid}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        autoComplete={autoComplete}
        isError={isError}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div<WrapperInterface>`
  width: 20rem;
  height: 3rem;
  display: flex;
  justify-content: space-between;
  color: ${(props) => props.theme.$gray_dark};
  box-sizing: border-box;
`;

const StyledLabel = styled.label`
  font-size: 1rem;
  padding: 0.5rem 0;
  color: ${(props) => props.theme.$gray_dark};
`;

const StyledInput = styled.input<InputInterface>`
  width: ${(props) => (props.labelText ? '80%' : '100%')};
  height: 100%;
  border: 0.1rem solid
    ${(props) => (props.isError ? 'red' : props.theme.$gray_medium)};
  border-radius: 0.5rem;
  box-sizing: border-box;

  ::placeholder {
    color: ${(props) => props.theme.$gray_medium};
  }
  &:focus {
    outline: none;
    border: 0.1rem solid ${(props) => props.theme.$primary};
  }
`;

export default Input;
