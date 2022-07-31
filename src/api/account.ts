import axios from '@api/core';
import { CreateAccountForm } from '@models';

const fetchPostIncomes = (createAccountForm: CreateAccountForm) =>
  axios
    .post('/incomes', { createAccountForm })
    .then((response) => response.data);

const fetchPostExpenditures = (createAccountForm: CreateAccountForm) =>
  axios
    .post('/expenditures', { createAccountForm })
    .then((response) => response.data);

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
