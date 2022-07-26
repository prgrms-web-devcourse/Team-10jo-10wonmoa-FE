import React, { useState } from 'react';
import { Modal } from '@components';

const Account = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Modal
        visible={visible}
        onClose={() => setVisible(false)}
        onSubmit={() => setVisible(false)}
      >
        모달을 띄우는데 성공했습니다.
      </Modal>
      <div onClick={() => setVisible(true)}>Account</div>
    </>
  );
};

export default Account;
