import { rest } from 'msw';

const loginHandlers = [
  rest.get(`/api/login`, (req, res, ctx) =>
    res(
      ctx.status(200),
      // 로그인 성공시 응답값 명세하기
      ctx.json({
        token: '1111',
      })
    )
  ),
];

export default loginHandlers;
