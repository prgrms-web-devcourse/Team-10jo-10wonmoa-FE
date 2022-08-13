import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { fetchGetUser } from '@api/users';
import { useQuery } from 'react-query';

const PrivateRoute = () => {
  const { data: authUser, isLoading } = useQuery('user', async () => {
    const { data } = await fetchGetUser();
    return data;
  });

  if (isLoading) {
    return <></>;
  }

  if (!authUser) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
