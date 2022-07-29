import styled from '@emotion/styled';
import { theme } from '@styles';

interface CheckBoxInterface {
  id?: string;
  text?: string;
  isChecked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckBox: React.FC<CheckBoxInterface> = ({
  id,
  text,
  isChecked,
  onChange,
}) => {
  return (
    <Wrapper>
      <StyledInput
        type="checkbox"
        id={id}
        checked={isChecked}
        onChange={onChange}
      />
      <p>{text}</p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StyledInput = styled.input`
  appearance: none;
  color: ${theme.$primary};
  border: 1.5px solid gainsboro;
  border-radius: 0.35rem;
  width: 1.5rem;
  height: 1.5rem;
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
