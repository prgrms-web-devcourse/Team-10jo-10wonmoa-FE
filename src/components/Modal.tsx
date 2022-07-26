import styled from '@emotion/styled';
import { BackupLayer } from '@components';
import { theme } from '@styles';
import { useClickAway } from '@hooks';

interface ModalProps {
  children: React.ReactNode;
  visible: boolean;
  onClose: () => void;
  onSubmit?: () => void;
}

const Modal: React.FC<ModalProps> = ({
  children,
  visible,
  onClose,
  onSubmit,
}) => {
  const modalRef = useClickAway(onClose);

  return (
    <BackupLayer visible={visible}>
      <ModalContainer ref={modalRef}>
        <ButtonContainer>
          {onClose && <button onClick={onClose}>X</button>}
        </ButtonContainer>
        <ContentContainer>{children}</ContentContainer>
        <ButtonContainer>
          {onClose && <button onClick={onClose}>취소</button>}
          {onSubmit && <button onClick={onSubmit}>확인</button>}
        </ButtonContainer>
      </ModalContainer>
    </BackupLayer>
  );
};

export default Modal;

const ModalContainer = styled.div`
  background-color: ${theme.$white};
  padding: 20px;
  box-sizing: border-box;
  border-radius: 15px;
  border: 2px solid ${theme.$primary};
  display: flex;
  flex-direction: column;

  & > div > button {
    border: 1px solid grey;
    background-color: white;
    padding: 5px;
    border-radius: 50%;
    height: 30px;
    min-width: 30px;
    cursor: pointer;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  button + button {
    margin-left: 5px;
  }
`;

const ContentContainer = styled.div`
  color: ${theme.$black};
  padding: 15px 0;
`;
