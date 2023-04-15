import { useRouter } from 'next/router';
import clsx from 'clsx';

import AuthLink from 'src/components/Auth/AuthLink';
import { Box, Flex } from '@violetit/ui';

interface AuthLayoutProps {
  children?: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const { pathname } = useRouter();

  return (
    <main className={clsx('flex items-center justify-center', 'h-screen')}>
      <Flex isFullWidth direction="col" className="max-w-xs">
        <Box className="mb-2">{children}</Box>
        <AuthLink pathname={pathname} />
      </Flex>
    </main>
  );
};

export default AuthLayout;
