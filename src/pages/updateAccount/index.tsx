import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Tabs, TopNavBar } from '@components';
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

const UpdateAccount = () => {
  const { accountId } = useParams<{ accountId: string }>();
  const { pathname } = useLocation();
  const originAccountType = ACCOUNT_TYPE.filter((type) =>
    pathname.includes(type.value.toLowerCase())
  )[0];
  const navigate = useNavigate();

  const [accountType, setAccountType] = useState(originAccountType);

  const [formValues, setFormValues] = useState<AccountDetailResponse>({
    amount: 0,
    userCategoryId: 0,
    registerDate: '',
    content: '',
    categoryName: '',
  });

  useEffect(() => {
    if (accountId === undefined) {
      alert('잘못된 접근입니다');
      navigate('/account-book/daily', { replace: true });
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

  useQuery(
    ['getAccount', accountId],
    () => {
      return originAccountType.value === 'INCOME'
        ? fetchGetIncomes(accountId)
        : fetchGetExpenditures(accountId);
    },
    {
      onSuccess: (data) => {
        setFormValues(data);
      },
      enabled: !!accountId,
    }
  );

  const updateAccountMutation = useMutation(
    ['updateAccount', accountId],
    (accountForm: CreateAccountRequest) => {
      return originAccountType.value === 'INCOME'
        ? fetchUpdateIncomes(accountId, accountForm)
        : fetchUpdateExpenditures(accountId, accountForm);
    },
    {
      onSuccess: () => {
        alert('수정 성공');
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
      onSuccess: () => {
        alert('삭제 성공');
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
    updateAccountMutation.mutate({
      userCategoryId,
      content,
      amount,
      registerDate,
    });
  };

  const handleDelete = () => {
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