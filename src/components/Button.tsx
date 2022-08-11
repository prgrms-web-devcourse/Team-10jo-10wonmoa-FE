import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { theme } from '@styles';

interface ButtonInterface {
  isDisabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  buttonType?: 'primary' | 'secondary' | 'red' | 'green' | 'white';
  sizeType?: 'small' | 'medium' | 'large';
}

const Button = <T extends ButtonInterface>({
  isDisabled = false,
  children,
  onClick,
  type = 'button',
  buttonType = 'primary',
  sizeType = 'small',
}: T) => {
  return (
    <StyledButton
      type={type}
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
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
  border: none;
  border-radius: 0.5rem;
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
  primary: css`
    color: ${theme.$white};
    background: ${theme.$primary};
  `,
  secondary: css`
    color: ${theme.$primary};
    background: ${theme.$secondary};
  `,
  red: css`
    color: ${theme.$white};
    background: ${theme.$red};
  `,
  green: css`
    color: ${theme.$white};
    background: ${theme.$green};
  `,
  white: css`
    border: 1px solid ${theme.$gray_medium};
    color: ${theme.$black};
    background: ${theme.$white};
  `,
};

const SizeType = {
  small: css`
    width: 3rem;
    font-size: 1rem;
  `,
  medium: css`
    width: 15rem;
    overflow: hidden;
    text-overflow: ellipsis;
  `,
  large: css`
    width: 20rem;
  `,
};
