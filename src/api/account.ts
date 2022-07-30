import axios from '@api/core';

export type CreateAccountForm = {
  registerDate: string;
  amount: string;
  userCategoryId: string;
  content?: string;
};

const fetchPostIncomes = (createAccountForm: CreateAccountForm) =>
  axios.post('/incomes', { createAccountForm });

const fetchGetIncomes = (id: string) => axios.get(`/incomes/${id}`);

export { fetchPostIncomes, fetchGetIncomes };
