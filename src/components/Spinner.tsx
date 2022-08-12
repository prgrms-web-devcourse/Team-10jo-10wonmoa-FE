import styled from '@emotion/styled';

interface SpinnerProps {
  size?: number;
}

const Spinner = ({ size = 10 }: SpinnerProps) => {
  return <StyledSpinner size={size} />;
};

export default Spinner;

const StyledSpinner = styled.div<{ size: number }>`
  border-radius: 50%;
  width: ${(props) => props.size}rem;
  height: ${(props) => props.size}rem;
  margin: 60px auto;
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  border-top: 1.1rem solid rgba(255, 99, 0, 0.2);
  border-right: 1.1rem solid rgba(255, 99, 0, 0.2);
  border-bottom: 1.1rem solid rgba(255, 99, 0, 0.2);
  border-left: 1.1rem solid ${(props) => props.theme.$primary};
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load 1.1s infinite linear;
  animation: load 1.1s infinite linear;
  &:after {
    border-radius: 50%;
    width: ${(props) => props.size}rem;
    height: ${(props) => props.size}rem;
  }
  @-webkit-keyframes load {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes load {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`;
