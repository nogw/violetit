import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import clsx from 'clsx';

type LinkProps = NextLinkProps & {
  children: React.ReactNode;
  underline?: boolean;
};

export const Link = ({ children, underline = true, ...props }: LinkProps) => {
  const styles = {
    underline: 'hover:underline',
  };

  return (
    <NextLink className={clsx('font-bold text-blue-500', { [styles.underline]: underline })} {...props}>
      {children}
    </NextLink>
  );
};
