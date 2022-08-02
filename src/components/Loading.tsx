import styled from '@emotion/styled';
import { theme } from '@styles';
import { BackupLayer } from '@components';
import { useIsFetching } from 'react-query';

const Loading = () => {
  const isFetching = useIsFetching();

  return (
    <BackupLayer visible={isFetching !== 0}>
      <Spinner />
    </BackupLayer>
  );
};

export default Loading;

const Spinner = styled.div`
  border-radius: 50%;
  width: 10rem;
  height: 10rem;
  margin: 60px auto;
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  border-top: 1.1rem solid rgba(255, 99, 0, 0.2);
  border-right: 1.1rem solid rgba(255, 99, 0, 0.2);
  border-bottom: 1.1rem solid rgba(255, 99, 0, 0.2);
  border-left: 1.1rem solid ${theme.$primary};
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load 1.1s infinite linear;
  animation: load 1.1s infinite linear;
  &:after {
    border-radius: 50%;
    width: 10rem;
    height: 10rem;
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
