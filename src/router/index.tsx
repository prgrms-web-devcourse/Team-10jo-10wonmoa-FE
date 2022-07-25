import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Login from '@pages/login';
import SignUp from '@pages/signUp';
import Account from '@pages/account';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
