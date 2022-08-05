import axios from '@api/core';
import type { CreateAccountRequest } from '@types';

const fetchPostIncomes = (createAccountRequest: CreateAccountRequest) =>
  axios
    .post('/incomes', createAccountRequest)
    .then((response) => response.data);

const fetchPostExpenditures = (createAccountRequest: CreateAccountRequest) =>
  axios
    .post('/expenditures', createAccountRequest)
    .then((response) => response.data);

const fetchGetIncomes = (id: string | undefined) =>
  axios.get(`/incomes/${id}`).then((response) => response.data);

const fetchGetExpenditures = (id: string | undefined) =>
  axios.get(`/expenditures/${id}`).then((response) => response.data);

const fetchUpdateIncomes = (
  id: string | undefined,
  createAccountRequest: CreateAccountRequest
) =>
  axios
    .put(`/incomes/${id}`, createAccountRequest)
    .then((response) => response.data);

const fetchUpdateExpenditures = (
  id: string | undefined,
  createAccountRequest: CreateAccountRequest
) =>
  axios
    .put(`/expenditures/${id}`, createAccountRequest)
    .then((response) => response.data);

const fetchDeleteIncomes = (id: string | undefined) =>
  axios.delete(`/incomes/${id}`).then((response) => response.data);

const fetchDeleteExpenditures = (id: string | undefined) =>
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
