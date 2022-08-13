import { authRequest } from '@api/core';
import type {
  CreateAccountRequest,
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from '@types';

const fetchPostIncomes = (createAccountRequest: CreateAccountRequest) =>
  authRequest()
    .post('/incomes', createAccountRequest)
    .then((response) => response.data);

const fetchPostExpenditures = (createAccountRequest: CreateAccountRequest) =>
  authRequest()
    .post('/expenditures', createAccountRequest)
    .then((response) => response.data);

const fetchGetIncomes = (id: string | undefined) =>
  authRequest()
    .get(`/incomes/${id}`)
    .then((response) => response.data);

const fetchGetExpenditures = (id: string | undefined) =>
  authRequest()
    .get(`/expenditures/${id}`)
    .then((response) => response.data);

const fetchUpdateIncomes = (
  id: string | undefined,
  createAccountRequest: CreateAccountRequest
) =>
  authRequest()
    .put(`/incomes/${id}`, createAccountRequest)
    .then((response) => response.data);

const fetchUpdateExpenditures = (
  id: string | undefined,
  createAccountRequest: CreateAccountRequest
) =>
  authRequest()
    .put(`/expenditures/${id}`, createAccountRequest)
    .then((response) => response.data);

const fetchDeleteIncomes = (id: string | undefined) =>
  authRequest()
    .delete(`/incomes/${id}`)
    .then((response) => response.data);

const fetchDeleteExpenditures = (id: string | undefined) =>
  authRequest()
    .delete(`/expenditures/${id}`)
    .then((response) => response.data);

const fetchGetCategory = (kind: string) => {
  return authRequest()
    .get(`/categories?kind=${kind}`)
    .then((response) => response.data);
};

const fetchPostCategory = (category: CreateCategoryRequest) => {
  return authRequest()
    .post('/categories', category)
    .then((response) => response.data);
};

const fetchUpdateCategory = ({ categoryId, name }: UpdateCategoryRequest) => {
  return authRequest()
    .patch(`/categories/${categoryId}`, { name })
    .then((response) => response.data);
};

const fetchDeleteCategory = (id: number) => {
  return authRequest()
    .delete(`/categories/${id}`)
    .then((response) => response.data);
};

const fetchGetSearchResult = (searchParams: string) => {
  const searchResultURL = `/account-book/search${searchParams}`;
  return authRequest()
    .get(searchResultURL)
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
  fetchPostCategory,
  fetchUpdateCategory,
  fetchDeleteCategory,
  fetchGetSearchResult,
};
