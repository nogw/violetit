import { Link as RRDLink, LinkProps as RRDLinkProps } from 'react-router-dom';

type LinkProps = RRDLinkProps & {
  children: React.ReactNode;
};

export const Link = ({ children, ...props }: LinkProps) => {
  return (
    <RRDLink className="font-bold text-blue-500 hover:underline" {...props}>
      {children}
    </RRDLink>
  );
};
