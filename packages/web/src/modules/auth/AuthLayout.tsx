import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Fragment } from 'react';

import { Navbar } from '@/common/Navbar';
import { useAuth } from './useAuth';

export const AuthLayout = () => {
  const location = useLocation();
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return (
    <Fragment>
      <Navbar title="Violetit" />
      <Outlet />
    </Fragment>
  );
};
