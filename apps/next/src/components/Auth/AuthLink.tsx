import { Text } from '@violetit/ui';
import { Link } from 'src/components/Shared/Link';

const AuthLink = ({ pathname }: { pathname: string }) => {
  const isSignUpScreen = pathname === '/auth/signup';
  const redirectMessage = isSignUpScreen ? 'Already a Violettor?' : 'New to Violetit?';

  const href = isSignUpScreen ? '/auth/signin' : '/auth/signup';
  const text = isSignUpScreen ? 'Log In' : 'Sign Up';

  return (
    <Text>
      {redirectMessage} <Link href={href}>{text}</Link>
    </Text>
  );
};

export default AuthLink;
