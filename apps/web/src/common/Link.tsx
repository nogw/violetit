import clsx from 'clsx';
import { Link as RRDLink, LinkProps as RRDLinkProps } from 'react-router-dom';

type LinkProps = RRDLinkProps & {
  children: React.ReactNode;
  underline?: boolean;
};

export const Link = ({ children, underline = true, ...props }: LinkProps) => {
  const styles = {
    underline: 'hover:underline',
  };

  return (
    <RRDLink className={clsx('font-bold text-blue-500', { [styles.underline]: underline })} {...props}>
      {children}
    </RRDLink>
  );
};
