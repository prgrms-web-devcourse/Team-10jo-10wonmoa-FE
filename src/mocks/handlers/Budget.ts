import { rest } from 'msw';
import type { Budget } from 'types/budget';
const budgetList: Budget[] = [];

const responseBudgetList = {
  registerDate: '2022-07',
  amount: 430000,
  expenditure: 213620,
  percent: 50,
  budgets: [
    {
      id: 1,
      categoryName: '패션/미용',
      amount: 100000,
      expenditure: 122860,
      percent: 122,
    },
    {
      id: 2,
      categoryName: '교통/차량',
      amount: 50000,
      expenditure: 46700,
      percent: 93,
    },
    {
      id: 3,
      categoryName: '건강',
      amount: 50000,
      expenditure: 43700,
      percent: 87,
    },
    {
      id: 4,
      categoryName: '식비',
      amount: 119200,
      expenditure: 0,
      percent: 0,
    },
    {
      id: 5,
      categoryName: '문화생활',
      amount: 4000,
      expenditure: 0,
      percent: 0,
    },
    {
      id: 6,
      categoryName: '마트/편의점',
      amount: 2500,
      expenditure: 0,
      percent: 0,
    },
  ],
};

const budgetHandlers = [
  // 예산 등록
  rest.put('/budgets', async (req, res, ctx) => {
    const data = await req.json();
    if (data.registerDate && data.amount && data.userCategoryId) {
      budgetList.push(data);
      return res(ctx.status(204));
    }
    return res(ctx.status(404));
  }),

  // 예산 조회
  rest.get('/budgets', async (req, res, ctx) => {
    const year = req.url.searchParams.get('year');
    const month = req.url.searchParams.get('month');
    if (year && month) {
      return res(ctx.status(200), ctx.json(responseBudgetList));
    }
    return res(ctx.status(404));
  }),
];

export default budgetHandlers;
