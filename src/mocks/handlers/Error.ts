import { rest } from 'msw';

const errorHandlers = [
  rest.get('/error/400', (req, res, ctx) => {
    return res(ctx.status(400), ctx.json({ message: '400에러입니다' }));
  }),
];

export default errorHandlers;
