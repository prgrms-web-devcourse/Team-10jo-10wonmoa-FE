import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { theme } from '@styles';

interface ButtonInterface {
  isDisabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  buttonType?: 'orange' | 'beige' | 'red';
  sizeType?: 'small' | 'medium' | 'large';
}

const Button: React.FC<ButtonInterface> = ({
  isDisabled = false,
  children,
  onClick,
  buttonType = 'orange',
  sizeType = 'small',
}) => {
  return (
    <StyledButton
      disabled={isDisabled}
      onClick={onClick}
      buttonType={buttonType}
      sizeType={sizeType}
    >
      {children}
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button<ButtonInterface>`
  border: none;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
  box-sizing: border-box;
  padding: 0.3rem 0;

  &:disabled {
    opacity: 1;
    cursor: default;
    color: ${theme.$white};
    background: ${theme.$gray_medium};
  }
  ${(props) => props.buttonType && ButtonType[props.buttonType]}
  ${(props) => props.sizeType && SizeType[props.sizeType]}
`;

const ButtonType = {
  orange: css`
    color: ${theme.$white};
    background: ${theme.$primary};
  `,
  beige: css`
    color: ${theme.$primary};
    background: ${theme.$beige};
  `,
  red: css`
    color: ${theme.$white};
    background: ${theme.$red};
  `,
};

const SizeType = {
  small: css`
    width: 3rem;
    font-size: 1rem;
  `,
  medium: css`
    width: 40%;
  `,
  large: css`
    width: 80%;
  `,
};
