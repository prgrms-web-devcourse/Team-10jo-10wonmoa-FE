import { rest } from 'msw';

interface Income {
  id: number;
  registerDate: string;
  amount: number;
  content: string;
  userCategoryId: number;
}

let incomes: Income[] = [
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
    id: 3,
    registerDate: '2022-07-15',
    amount: 5000,
    content: '식비',
    userCategoryId: 3,
  },
];

const incomesHandlers = [
  rest.post('/incomes', async (req, res, ctx) => {
    const data = await req.json();
    data.id = incomes[incomes.length - 1].id + 1;

    incomes.push(data as Income);
    return res(
      ctx.delay(100),
      ctx.status(200),
      ctx.json({
        id: data.id,
      })
    );
  }),

  rest.get('/incomes/:incomeId', async (req, res, ctx) => {
    const { incomeId } = req.params;

    const targetIncome = incomes.find(
      (income) => income.id === Number(incomeId)
    );

    if (targetIncome) {
      return res(ctx.delay(100), ctx.status(200), ctx.json(targetIncome));
    }

    return res(
      ctx.status(404),
      ctx.json({ message: '해당 데이터는 존재하지 않습니다' })
    );
  }),

  rest.put('/incomes/:incomeId', async (req, res, ctx) => {
    const { incomeId } = req.params;
    const { registerDate, amount, content, userCategoryId } = await req.json();

    const targetIncome = incomes.find(
      (income) => income.id === Number(incomeId)
    );

    if (targetIncome) {
      incomes = incomes.map((income) =>
        income.id === Number(incomeId)
          ? {
              id: income.id,
              registerDate,
              amount,
              content,
              userCategoryId,
            }
          : income
      );
    }
    return res(
      ctx.status(404),
      ctx.json({ message: '해당 데이터는 존재하지 않습니다' })
    );
  }),

  rest.delete('/incomes/:incomeId', async (req, res, ctx) => {
    const { incomeId } = req.params;

    const targetIncome = incomes.find(
      (income) => income.id === Number(incomeId)
    );

    if (targetIncome) {
      incomes = incomes.filter((income) => income.id !== Number(incomeId));
      return res(
        ctx.delay(100),
        ctx.status(200),
        ctx.json(incomes[Number(incomeId)])
      );
    }
    return res(
      ctx.status(404),
      ctx.json({ message: '해당 데이터는 존재하지 않습니다' })
    );
  }),
];

export default incomesHandlers;
