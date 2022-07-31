import axios from '@api/core';

export type CreateAccountForm = {
  registerDate: string;
  amount: string;
  userCategoryId: string;
  content?: string;
};

const fetchPostIncomes = (createAccountForm: CreateAccountForm) =>
  axios.post('/incomes', { createAccountForm });

const fetchPostExpenditures = (createAccountForm: CreateAccountForm) =>
  axios.post('/expenditures', { createAccountForm });

const fetchGetIncomes = (id: string) => axios.get(`/incomes/${id}`);

const fetchGetCategory = (kind: string) => {
  return axios
    .get(`/categories?kind=${kind}`)
    .then((response) => response.data);
};

export {
  fetchPostIncomes,
  fetchPostExpenditures,
  fetchGetIncomes,
  fetchGetCategory,
};
