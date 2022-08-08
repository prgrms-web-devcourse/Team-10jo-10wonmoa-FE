import { axiosAuthInstance } from '@api/core';
import type { CreateAccountRequest } from '@types';

const fetchPostIncomes = (createAccountRequest: CreateAccountRequest) =>
  axiosAuthInstance
    .post('/incomes', createAccountRequest)
    .then((response) => response.data);

const fetchPostExpenditures = (createAccountRequest: CreateAccountRequest) =>
  axiosAuthInstance
    .post('/expenditures', createAccountRequest)
    .then((response) => response.data);

const fetchGetIncomes = (id: string | undefined) =>
  axiosAuthInstance.get(`/incomes/${id}`).then((response) => response.data);

const fetchGetExpenditures = (id: string | undefined) =>
  axiosAuthInstance
    .get(`/expenditures/${id}`)
    .then((response) => response.data);

const fetchUpdateIncomes = (
  id: string | undefined,
  createAccountRequest: CreateAccountRequest
) =>
  axiosAuthInstance
    .put(`/incomes/${id}`, createAccountRequest)
    .then((response) => response.data);

const fetchUpdateExpenditures = (
  id: string | undefined,
  createAccountRequest: CreateAccountRequest
) =>
  axiosAuthInstance
    .put(`/expenditures/${id}`, createAccountRequest)
    .then((response) => response.data);

const fetchDeleteIncomes = (id: string | undefined) =>
  axiosAuthInstance.delete(`/incomes/${id}`).then((response) => response.data);

const fetchDeleteExpenditures = (id: string | undefined) =>
  axiosAuthInstance
    .delete(`/expenditures/${id}`)
    .then((response) => response.data);

const fetchGetCategory = (kind: string) => {
  return axiosAuthInstance
    .get(`/categories?kind=${kind}`)
    .then((response) => response.data);
};

const fetchGetSearchResult = () =>
  axios.get('/account-book/search').then((response) => response.data);

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
  fetchGetSearchResult,
};
