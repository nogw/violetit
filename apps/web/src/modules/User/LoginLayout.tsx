import { Text } from '@violetit/ui';

import { Outlet, Navigate, useLocation } from 'react-router-dom';

import { useAuth } from 'src/modules/Auth/useAuth';
import { Link } from 'src/common/Link';

const SignUpOrLoginLink = ({ pathname }: { pathname: string }) => {
  const isSignUpScreen = pathname === '/auth/signup';
  const redirectText = isSignUpScreen ? 'Already a Violettor?' : 'New to Violetit?';

  const link = {
    to: isSignUpScreen ? '/auth' : '/auth/signup',
    text: isSignUpScreen ? 'Log In' : 'Sign Up',
  };

  return (
    <Text>
      {redirectText} <Link to={link.to}>{link.text}</Link>
    </Text>
  );
};

const LoginLayout = () => {
  const { pathname } = useLocation();
  const { token } = useAuth();

  if (token) {
    return <Navigate replace to="/" />;
  }

  return (
    <main className="flex h-screen items-center justify-center">
      <div className="w-full max-w-xs">
        <div className="mb-4">
          <Outlet />
        </div>
        <SignUpOrLoginLink pathname={pathname} />
      </div>
    </main>
  );
};

export default LoginLayout;
