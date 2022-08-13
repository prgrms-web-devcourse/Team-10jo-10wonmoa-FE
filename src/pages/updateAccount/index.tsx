import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Tabs, TopNavBar } from '@components';
import { AccountForm } from '@components/account';
import { ACCOUNT_TYPE } from '@constants/Tabs';
import {
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
import { default as toast } from 'react-hot-toast';

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
      toast.error('가계부 내용이 존재하지 않아요.');
      navigate('/account-book/daily', { replace: true });
      return;
    }

    const toNumberAccountId = parseInt(accountId);
    if (isNaN(toNumberAccountId) || toNumberAccountId === 0) {
      toast.error('가계부 내용이 존재하지 않아요.');
      navigate('/account-book/daily', { replace: true });
    }
  }, [accountId]);

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
        toast.success('수정 성공');
        navigate('/account-book/daily', { replace: true });
      },
    }
  );

  const deleteAccountMutation = useMutation(
    ['deleteAccount', accountId],
    () => {
      return originAccountType.value === 'INCOME'
        ? fetchDeleteIncomes(accountId)
        : fetchDeleteExpenditures(accountId);
    },
    {
      onSuccess: () => {
        toast.success('삭제 성공');
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

  const handleDelete = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
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
        formValues={formValues}
        onDelete={handleDelete}
        accountType={accountType}
      />
    </>
  );
};

export default UpdateAccount;
