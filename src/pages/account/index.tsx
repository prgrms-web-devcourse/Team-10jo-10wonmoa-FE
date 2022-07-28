import React, { useState } from 'react';
import { Modal, Tabs, TopNavAccount } from '@components';
import AccountForm from './components/AccountForm';

const ACCOUNT_TYPE = [
  {
    value: 'incomes',
    title: '수입',
  },
  {
    value: 'expenditures',
    title: '지출',
  },
];
const Account = () => {
  const [visible, setVisible] = useState(false);
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE[0].value);

  const handleTabClick = (
    e: React.MouseEvent<HTMLDivElement>,
    item: { value: string; title: string }
  ) => {
    setAccountType(item.value);
  };

  return (
    <>
      <TopNavAccount />
      <Modal
        visible={visible}
        onClose={() => setVisible(false)}
        onSubmit={() => setVisible(false)}
      >
        모달을 띄우는데 성공했습니다.
      </Modal>
      <div onClick={() => setVisible(true)}>{accountType}</div>
      <Tabs TabItems={ACCOUNT_TYPE} onClick={handleTabClick}></Tabs>
      <AccountForm accountType={accountType} />
    </>
  );
};

export default Account;
