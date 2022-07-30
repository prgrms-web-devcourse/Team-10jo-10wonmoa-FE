import { rest } from 'msw';

interface Category {
  id: number;
  name: string;
  categoryType: 'INCOME' | 'EXPENDITURE';
}

export const categories: Category[] = [
  {
    id: 1,
    name: '식비',
    categoryType: 'EXPENDITURE',
  },
  {
    id: 2,
    name: '교통/차량',
    categoryType: 'EXPENDITURE',
  },
  {
    id: 3,
    name: '문화생활',
    categoryType: 'EXPENDITURE',
  },
  {
    id: 4,
    name: '마트/편의점',
    categoryType: 'EXPENDITURE',
  },
  {
    id: 5,
    name: '패션/미용',
    categoryType: 'EXPENDITURE',
  },
  {
    id: 6,
    name: '생활용품',
    categoryType: 'EXPENDITURE',
  },
  {
    id: 7,
    name: '주거/통신',
    categoryType: 'EXPENDITURE',
  },
  {
    id: 8,
    name: '교통/차량',
    categoryType: 'EXPENDITURE',
  },
];

const categoryHandlers = [
  rest.get('/categories?kind=income', async (req, res, ctx) => {
    // categories.push((await req.json()) as Category);
    return res(ctx.delay(100), ctx.status(200), ctx.json(categories));
  }),
];

export default categoryHandlers;
