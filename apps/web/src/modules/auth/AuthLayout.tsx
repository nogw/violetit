import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Fragment } from 'react';

import { Navbar } from '@/common/Navbar';
import { useAuth } from './useAuth';

export const AuthLayout = () => {
  const { pathname } = useLocation();
  const { token } = useAuth();

  if (!token) {
    return <Navigate state={{ from: pathname }} to="/auth" />;
  }

  return (
    <Fragment>
      <Navbar title="Violetit" />
      <Outlet />
    </Fragment>
  );
};
