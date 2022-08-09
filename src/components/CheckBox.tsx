import styled from '@emotion/styled';
import { theme } from '@styles';

interface CheckBoxInterface {
  text?: string;
  isChecked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckBox: React.FC<CheckBoxInterface> = ({
  text,
  isChecked,
  onChange,
}) => {
  return (
    <Wrapper>
      <StyledInput type="checkbox" checked={isChecked} onChange={onChange} />
      {text}
    </Wrapper>
  );
};

const Wrapper = styled.label`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  color: ${(props) => props.theme.$gray_dark};
  & + & {
    border-top: 1px solid ${(props) => props.theme.$gray_accent};
  }
`;

const StyledInput = styled.input`
  appearance: none;
  color: ${theme.$primary};
  border: 1.5px solid ${(props) => props.theme.$gray_medium};
  border-radius: 0.35rem;
  width: 1.8rem;
  height: 1.8rem;
  margin-right: 0.5rem;

  &:checked {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-check'%3E%3Cpolyline points='20 6 9 17 4 12'%3E%3C/polyline%3E%3C/svg%3E");
    border-color: transparent;
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    color: ${theme.$primary};
    background-color: ${theme.$primary};
  }
`;

export default CheckBox;
