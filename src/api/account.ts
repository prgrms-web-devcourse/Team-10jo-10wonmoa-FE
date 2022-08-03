import axios from '@api/core';
import { CreateAccountForm } from '@models';

const fetchPostIncomes = (createAccountForm: CreateAccountForm) =>
  axios.post('/incomes', createAccountForm).then((response) => response.data);

const fetchPostExpenditures = (createAccountForm: CreateAccountForm) =>
  axios
    .post('/expenditures', createAccountForm)
    .then((response) => response.data);

const fetchGetIncomes = (id: string) =>
  axios.get(`/incomes/${id}`).then((response) => response.data);

const fetchGetExpenditures = (id: string) =>
  axios.get(`/expenditures/${id}`).then((response) => response.data);

const fetchUpdateIncomes = (id: string, createAccountForm: CreateAccountForm) =>
  axios
    .put(`/incomes/${id}`, createAccountForm)
    .then((response) => response.data);

const fetchUpdateExpenditures = (
  id: string,
  createAccountForm: CreateAccountForm
) =>
  axios
    .put(`/expenditures/${id}`, createAccountForm)
    .then((response) => response.data);

const fetchDeleteIncomes = (id: string) =>
  axios.delete(`/incomes/${id}`).then((response) => response.data);

const fetchDeleteExpenditures = (id: string) =>
  axios.delete(`/expenditures/${id}`).then((response) => response.data);

const fetchGetCategory = (kind: string) => {
  return axios
    .get(`/categories?kind=${kind}`)
    .then((response) => response.data);
};

export {
  fetchPostIncomes,
  fetchPostExpenditures,
  fetchGetIncomes,
  fetchGetExpenditures,
  fetchUpdateIncomes,
  fetchUpdateExpenditures,
  fetchDeleteIncomes,
  fetchDeleteExpenditures,
  fetchGetCategory,
};
