import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Tabs, TopNavBar } from '@components';
import { AccountForm } from '@components/account';
import {
  fetchGetCategory,
  fetchPostExpenditures,
  fetchPostIncomes,
} from '@api';
import type {
  TabItem,
  CreateAccountRequest,
  AccountDetailResponse,
} from '@types';

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
  const [formValues, setFormValues] = useState<AccountDetailResponse>({
    amount: 0,
    userCategoryId: 0,
    registerDate: '',
    categoryName: '',
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
    (accountForm: CreateAccountRequest) => {
      return accountType.value === 'INCOME'
        ? fetchPostIncomes(accountForm)
        : fetchPostExpenditures(accountForm);
    },
    {
      onSuccess: () => {
        alert('등록 성공');
        navigate('/account-book/daily', { replace: true });
      },
    }
  );

  const handleTabClick = (item: TabItem) => {
    setAccountType(item);
    setFormValues((prevForm) => ({
      ...prevForm,
      userCategoryId: 0,
      categoryName: '',
    }));
  };

  const handleSubmit = () => {
    const { userCategoryId, content, amount, registerDate } = formValues;
    createAccountMutation.mutate({
      userCategoryId,
      content,
      amount,
      registerDate,
    });
  };

  return (
    <>
      <TopNavBar title={accountType.title} isActiveGoBack />
      <Tabs tabItems={ACCOUNT_TYPE} onClick={handleTabClick}></Tabs>
      <AccountForm
        onSubmit={handleSubmit}
        onChangeForm={setFormValues}
        categories={categories?.categories}
        formValues={formValues}
      />
    </>
  );
};

export default CreateAccount;