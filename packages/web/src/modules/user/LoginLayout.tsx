import { Link } from '@/shared-components/Link';

import { Outlet, Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '../auth/useAuth';

const SignUpOrLoginLink = ({ pathname }: { pathname: string }) => {
  const isSignUpScreen = pathname === '/auth/signup';
  const redirectText = isSignUpScreen
    ? 'Already a Violettor?'
    : 'New to Violetit?';

  const link = {
    to: isSignUpScreen ? '/auth' : '/auth/signup',
    text: isSignUpScreen ? 'Log In' : 'Sign Up',
  };

  return (
    <p className="mt-4">
      {redirectText} <Link to={link.to}>{link.text}</Link>
    </p>
  );
};

const LoginLayout = () => {
  const { pathname } = useLocation();
  const { token } = useAuth();

  if (token) {
    return <Navigate to="/feed" replace />;
  }

  return (
    <main className="h-screen flex justify-center items-center">
      <div className="w-full max-w-xs">
        <div className="">
          <Outlet />
        </div>
        <SignUpOrLoginLink pathname={pathname} />
      </div>
    </main>
  );
};

export default LoginLayout;
