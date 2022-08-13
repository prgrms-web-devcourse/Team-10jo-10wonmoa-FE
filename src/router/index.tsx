import { Routes, Route, Navigate } from 'react-router-dom';
import {
  Login,
  SignUp,
  CreateAccount,
  UpdateAccount,
  AccountBook,
  AccountBookDaily,
  AccountBookCalendar,
  AccountBookMonthly,
  Statistics,
  Budget,
  NotFound,
  OAuth2RedirectHandler,
  Profile,
  Search,
} from '@pages';

import PrivateRoute from './PrivateRoute';

const AppRouter = () => {
  return (
    <Routes>
      <Route index element={<Navigate replace to="/account-book/daily" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route
        path="/oauth2/redirect"
        element={<OAuth2RedirectHandler />}
      ></Route>

      <Route element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />

        <Route path="/account">
          <Route path={'create'} element={<CreateAccount />} />
          <Route
            path={'update/income/:accountId'}
            element={<UpdateAccount />}
          />
          <Route
            path={'update/expenditure/:accountId'}
            element={<UpdateAccount />}
          />
        </Route>
        <Route path="/account-book" element={<AccountBook />}>
          <Route path={'daily'} element={<AccountBookDaily />} />
          <Route path={'calendar'} element={<AccountBookCalendar />} />
          <Route path={'monthly'} element={<AccountBookMonthly />} />
        </Route>
        <Route path="/search" element={<Search />}></Route>
        <Route path="/statistics" element={<Statistics />}></Route>
        <Route path="/budget" element={<Budget />}></Route>
      </Route>

      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
