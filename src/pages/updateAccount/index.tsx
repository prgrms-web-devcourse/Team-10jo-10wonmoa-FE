import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Tabs, TopNavBar } from '@components';
import type { TabItem } from '@components/Tabs';
import { AccountForm } from '@components/account';
import {
  fetchGetCategory,
  fetchGetIncomes,
  fetchGetExpenditures,
  fetchUpdateExpenditures,
  fetchUpdateIncomes,
  fetchDeleteIncomes,
  fetchDeleteExpenditures,
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

const UpdateAccount = () => {
  const { accountId } = useParams<{ accountId: string }>();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [accountType, setAccountType] = useState(
    ACCOUNT_TYPE.filter((type) =>
      pathname.includes(type.value.toLowerCase())
    )[0]
  );

  const [formValues, setFormValues] = useState<CreateAccountForm>({
    amount: 0,
    userCategoryId: 0,
    registerDate: '',
  });

  useEffect(() => {
    if (accountId === undefined) {
      alert('잘못된 접근입니다');
      return;
    }

    const toNumberAccountId = parseInt(accountId);
    if (isNaN(toNumberAccountId) || toNumberAccountId === 0) {
      alert('잘못된 접근입니다');
      navigate('/account-book/daily', { replace: true });
    }
  }, [accountId]);

  const { data: categories } = useQuery(
    ['categories', accountType.value],
    () => fetchGetCategory(accountType.value),
    {
      enabled: !!accountType,
    }
  );

  const { data: accountDetailInfo } = useQuery(
    ['getAccount', accountId],
    () => {
      return accountType.value === 'INCOME'
        ? fetchGetIncomes(accountId)
        : fetchGetExpenditures(accountId);
    },
    {
      onSuccess: (data) => {
        const { amount, content, registerDate, userCategoryId } = data;

        setFormValues({
          amount,
          content,
          registerDate,
          userCategoryId,
        });
        console.log(data);
      },
      enabled: !!accountId,
    }
  );

  const updateAccountMutation = useMutation(
    ['updateAccount', accountId],
    (accountForm: CreateAccountForm) => {
      return accountType.value === 'INCOME'
        ? fetchUpdateIncomes(accountId, accountForm)
        : fetchUpdateExpenditures(accountId, accountForm);
    },
    {
      onSuccess: (data, variable) => {
        alert('success');
        console.log(data, variable);
        navigate('/account-book/daily', { replace: true });
      },
    }
  );

  const deleteAccountMutation = useMutation(
    ['deleteAccount', accountId],
    () => {
      return accountType.value === 'INCOME'
        ? fetchDeleteIncomes(accountId)
        : fetchDeleteExpenditures(accountId);
    },
    {
      onSuccess: (data, variable) => {
        alert('success');
        console.log(data, variable);
        // navigate('/account-book/daily', { replace: true });
      },
    }
  );

  const handleTabClick = (item: TabItem) => {
    setAccountType(item);
  };

  const handleSubmit = () => {
    console.log(formValues);
    // updateAccountMutation.mutate(formValues);
  };

  const handleDelete = () => {
    console.log('delete');
    deleteAccountMutation.mutate();
  };

  return (
    <>
      <TopNavBar title={accountType.title} isActiveGoBack />
      <Tabs
        tabItems={ACCOUNT_TYPE}
        onClick={handleTabClick}
        initialItem={accountType}
      />
      <AccountForm
        onSubmit={handleSubmit}
        onChangeForm={setFormValues}
        categories={categories?.categories}
        formValues={formValues}
        onDelete={handleDelete}
      />
    </>
  );
};

export default UpdateAccount;
