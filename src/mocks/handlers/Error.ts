import { rest } from 'msw';

const errorHandlers = [
  rest.get('/400error', (req, res, ctx) => {
    return res(
      ctx.status(400),
      ctx.json({ errorMessage: '잘못된 로그인입니다' })
    );
  }),
];

export default errorHandlers;
