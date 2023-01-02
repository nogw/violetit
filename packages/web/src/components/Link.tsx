import { Link as RRDLink, LinkProps as RRDLinkProps } from 'react-router-dom';

interface LinkProps {
  children: React.ReactNode;
  props: RRDLinkProps;
}

export const Link: React.FC<LinkProps> = ({ children, props }) => {
  return <RRDLink {...props}>{children}</RRDLink>;
};
