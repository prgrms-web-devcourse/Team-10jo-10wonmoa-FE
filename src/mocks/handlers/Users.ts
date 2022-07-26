import { rest } from 'msw';

const usersHandlers = [
  rest.post('/users/login', async (req, res, ctx) => {
    const { email, password } = await req.json();
    if (email === 'test@test.com' && password === 'test') {
      return res(
        ctx.status(200),
        ctx.cookie('access-token', '1111'),
        ctx.cookie('refresh-token', '2222')
      );
    }
    return res(
      ctx.status(401),
      ctx.json({ message: '가입되지 않은 회원입니다' })
    );
  }),
];

export default usersHandlers;
