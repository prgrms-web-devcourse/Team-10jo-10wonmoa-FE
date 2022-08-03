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
  fetchPostExpenditures,
  fetchPostIncomes,
} from '@api';
import { CreateAccountForm } from '@models';

const ACCOUNT_TYPE: TabItem[] = [
  {
    value: 'income',
    title: '수입',
  },
  {
    value: 'expenditure',
    title: '지출',
  },
];

const UpdateAccount = () => {
  const { accountId } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [accountType, setAccountType] = useState(
    ACCOUNT_TYPE.filter((type) => pathname.includes(type.value))[0]
  );
  const [formValues, setFormValues] = useState<CreateAccountForm>({
    amount: '',
    userCategoryId: '',
    registerDate: '',
  });

  const { data: categories } = useQuery(
    ['categories', accountType.value],
    () => fetchGetCategory(accountType.value),
    {
      enabled: !!accountType,
    }
  );

  useEffect(() => {
    if (accountId === undefined) {
      return;
    }

    const toNumberAccountId = parseInt(accountId);
    if (isNaN(toNumberAccountId) || toNumberAccountId === 0) {
      alert('잘못된 접근입니다');
      navigate('/account-book/daily', { replace: true });
    }
  }, [accountId]);

  const { data } = useQuery(
    ['getAccount', accountId],
    () => {
      if (accountId === undefined) {
        return;
      }

      return accountType.value === 'income'
        ? fetchGetIncomes(accountId)
        : fetchGetExpenditures(accountId);
    },
    {
      enabled: !!accountId,
    }
  );

  console.log(data);

  const createAccountMutation = useMutation(
    'AddAccount',
    (accountForm: CreateAccountForm) => {
      return accountType.value === 'income'
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
      <Tabs
        tabItems={ACCOUNT_TYPE}
        onClick={handleTabClick}
        initialItem={accountType}
      />
      <AccountForm
        onSubmit={handleSubmit}
        onChangeForm={setFormValues}
        categories={categories?.categories}
      />
    </>
  );
};

export default UpdateAccount;
