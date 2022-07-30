import React, { useState } from 'react';
import { Tabs, TopNavBar } from '@components';
import type { TabItem } from '@components/Tabs';
import AccountForm from './components/AccountForm';
import { useMutation } from 'react-query';
import { fetchPostIncomes } from '@api';
import type { CreateAccountForm } from '@api';

const ACCOUNT_TYPE: TabItem[] = [
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
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE[0]);
  const [formValues, setFormValues] = useState<CreateAccountForm>({
    amount: '',
    userCategoryId: '',
    registerDate: '',
  });

  const mutation = useMutation((accountForm: CreateAccountForm) => {
    return fetchPostIncomes(accountForm);
  });

  const handleTabClick = (item: TabItem) => {
    setAccountType(item);
  };

  const handleSubmit = () => {
    console.log(formValues);
    mutation.mutate(formValues);
  };

  return (
    <>
      <TopNavBar title={accountType.title} isActiveGoBack />
      <Tabs tabItems={ACCOUNT_TYPE} onClick={handleTabClick}></Tabs>
      <>
        {mutation.isLoading ? 'loading..' : mutation.isError ? 'error' : null}
        {mutation.isSuccess ? 'success' : null}
      </>
      <AccountForm onSubmit={handleSubmit} onChangeForm={setFormValues} />
    </>
  );
};

export default Account;
