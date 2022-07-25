import styled from '@emotion/styled';
import { useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';

interface BackupLayerProps {
  children: React.ReactNode;
}

const ModalWrapper = styled.div`
  background: rgba(0, 0, 0, 0.6);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 999;
`;

const ModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const BackupLayer: React.FC<BackupLayerProps> = ({ children }) => {
  const el = useMemo(() => document.createElement('div'), []);
  useEffect(() => {
    document.querySelector('.app_layout')?.appendChild(el);

    return () => {
      document.querySelector('.app_layout')?.removeChild(el);
    };
  });

  return createPortal(
    <ModalWrapper>
      <ModalContainer>{children}</ModalContainer>
    </ModalWrapper>,
    el
  );
};

export default BackupLayer;
