import React, { useState } from 'react';
import { BackupLayer, Modal } from '@components';

const Account = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Modal visible={visible} onClose={() => setVisible(false)}>
        hello
      </Modal>
      Account
    </>
  );
};

export default Account;
