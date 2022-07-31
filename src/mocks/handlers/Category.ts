import { rest } from 'msw';

interface Category {
  id: number;
  name: string;
  categoryType: 'INCOME' | 'EXPENDITURE';
}

const categories: Category[] = [
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
  {
    id: 9,
    name: '월급',
    categoryType: 'INCOME',
  },
  {
    id: 10,
    name: '부수입',
    categoryType: 'INCOME',
  },
  {
    id: 11,
    name: '용돈',
    categoryType: 'INCOME',
  },
  {
    id: 12,
    name: '상여',
    categoryType: 'INCOME',
  },
  {
    id: 13,
    name: '금융소득',
    categoryType: 'INCOME',
  },
  {
    id: 14,
    name: '기타',
    categoryType: 'INCOME',
  },
];

const categoryHandlers = [
  rest.get('/categories', async (req, res, ctx) => {
    const kind = req.url.searchParams.get('kind');

    const filteredData = categories.filter(
      (category) => category.categoryType === kind?.toUpperCase()
    );

    return res(ctx.delay(100), ctx.status(200), ctx.json(filteredData));
  }),
];

export default categoryHandlers;
