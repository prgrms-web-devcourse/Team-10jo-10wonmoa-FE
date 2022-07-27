import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { theme } from '@styles';

interface ButtonInterface {
  isDisabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  buttonType?: 'primary' | 'secondary' | 'red' | 'green';
  sizeType?: 'small' | 'medium' | 'large';
}

const Button: React.FC<ButtonInterface> = ({
  isDisabled = false,
  children,
  onClick,
  buttonType = 'primary',
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
  height: 25px;
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
    width: 80%;
    /* position: absolute;
    bottom: calc(env(safe-area-inset-bottom) + 1rem); */
  `,
};
