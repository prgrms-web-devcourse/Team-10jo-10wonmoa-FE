import { rest } from 'msw';

interface Expenditure {
  id: number;
  registerDate: string;
  amount: number;
  content: string;
  userCategoryId: number;
}

let expenditures: Expenditure[] = [
  {
    id: 1,
    registerDate: '2022-07-10',
    amount: 1000,
    content: '치킨',
    userCategoryId: 1,
  },
  {
    id: 2,
    registerDate: '2022-07-13',
    amount: 10000,
    content: '교통',
    userCategoryId: 2,
  },
  {
    id: 13,
    registerDate: '2022-07-15',
    amount: 5000,
    content: '식비',
    userCategoryId: 3,
  },
];

const expendituresHandlers = [
  rest.post('/expenditures', async (req, res, ctx) => {
    const data = await req.json();
    data.id = expenditures[expenditures.length - 1].id + 1;

    expenditures.push(data as Expenditure);
    return res(
      ctx.delay(100),
      ctx.status(200),
      ctx.json({
        id: data.id,
      })
    );
  }),

  rest.get('/expenditures/:expendituresId', async (req, res, ctx) => {
    const { expendituresId } = req.params;

    const targetExpenditure = expenditures.find(
      (expenditure) => expenditure.id === Number(expendituresId)
    );

    if (targetExpenditure) {
      return res(ctx.delay(100), ctx.status(200), ctx.json(targetExpenditure));
    }

    return res(
      ctx.status(404),
      ctx.json({ message: '해당 데이터는 존재하지 않습니다' })
    );
  }),

  rest.put('/expenditures/:expendituresId', async (req, res, ctx) => {
    const { expendituresId } = req.params;
    const { registerDate, amount, content, userCategoryId } = await req.json();

    const targetExpenditure = expenditures.find(
      (expenditure) => expenditure.id === Number(expendituresId)
    );

    if (targetExpenditure) {
      expenditures = expenditures.map((expenditure) =>
        expenditure.id === Number(expendituresId)
          ? {
              id: expenditure.id,
              registerDate,
              amount,
              content,
              userCategoryId,
            }
          : expenditure
      );
    }
    return res(
      ctx.status(404),
      ctx.json({ message: '해당 데이터는 존재하지 않습니다' })
    );
  }),

  rest.delete('/expenditures/:expendituresId', async (req, res, ctx) => {
    const { expendituresId } = req.params;

    const targetExpenditure = expenditures.find(
      (expenditure) => expenditure.id === Number(expendituresId)
    );

    if (targetExpenditure) {
      expenditures = expenditures.filter(
        (expenditure) => expenditure.id !== Number(expendituresId)
      );
      return res(
        ctx.delay(100),
        ctx.status(200),
        ctx.json(expenditures[Number(expendituresId)])
      );
    }
    return res(
      ctx.status(404),
      ctx.json({ message: '해당 데이터는 존재하지 않습니다' })
    );
  }),
];

export default expendituresHandlers;
