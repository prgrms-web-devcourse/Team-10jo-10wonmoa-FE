import styled from '@emotion/styled';
import { BackupLayer } from '@components';

interface ModalProps {
  children: React.ReactNode;
  visible: boolean;
  onClose?: () => void;
  onSubmit?: () => void;
}

const Modal: React.FC<ModalProps> = ({
  children,
  visible,
  onClose,
  onSubmit,
}) => {
  return (
    <BackupLayer>
      {onClose && <button>X</button>}
      {children}
      {onClose && <button onClick={onClose}>취소</button>}
      {onSubmit && <button onClick={onSubmit}>확인</button>}
    </BackupLayer>
  );
};

export default Modal;
