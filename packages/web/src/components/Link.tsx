import { Link as RRDLink, LinkProps as RRDLinkProps } from 'react-router-dom';

type LinkProps = RRDLinkProps & {
  children: React.ReactNode;
};

export const Link: React.FC<LinkProps> = ({ children, ...props }) => {
  return (
    <RRDLink className="text-blue-500 font-bold hover:underline" {...props}>
      {children}
    </RRDLink>
  );
};
