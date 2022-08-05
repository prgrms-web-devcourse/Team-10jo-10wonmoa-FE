import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Tabs, TopNavBar } from '@components';
import type { TabItem } from '@components/Tabs';
import { AccountForm } from '@components/account';
import {
  fetchGetCategory,
  fetchPostExpenditures,
  fetchPostIncomes,
} from '@api';
import type { CreateAccountForm } from '@types';

const ACCOUNT_TYPE: TabItem[] = [
  {
    value: 'INCOME',
    title: '수입',
  },
  {
    value: 'EXPENDITURE',
    title: '지출',
  },
];

const CreateAccount = () => {
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE[0]);
  const [formValues, setFormValues] = useState<CreateAccountForm>({
    amount: 0,
    userCategoryId: 0,
    registerDate: '',
  });
  const navigate = useNavigate();

  const { data: categories } = useQuery(
    ['categories', accountType.value],
    () => fetchGetCategory(accountType.value),
    {
      enabled: !!accountType,
    }
  );

  const createAccountMutation = useMutation(
    'AddAccount',
    (accountForm: CreateAccountForm) => {
      return accountType.value === 'INCOME'
        ? fetchPostIncomes(accountForm)
        : fetchPostExpenditures(accountForm);
    },
    {
      onSuccess: (data, variable) => {
        alert('success');
        console.log(data, variable);
        navigate('/account-book/daily', { replace: true });
      },
    }
  );

  const handleTabClick = (item: TabItem) => {
    setAccountType(item);
  };

  const handleSubmit = () => {
    console.log(formValues);
    createAccountMutation.mutate(formValues);
  };

  return (
    <>
      <TopNavBar title={accountType.title} isActiveGoBack />
      <Tabs tabItems={ACCOUNT_TYPE} onClick={handleTabClick}></Tabs>
      <AccountForm
        onSubmit={handleSubmit}
        onChangeForm={setFormValues}
        categories={categories?.categories}
      />
    </>
  );
};

export default CreateAccount;
