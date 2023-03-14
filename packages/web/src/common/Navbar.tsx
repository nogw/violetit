import { Button, Flex } from '@violetit/ui';
import { RiMagicFill } from 'react-icons/ri';
import { MdExitToApp } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../modules/auth/useAuth';
import { Link } from './Link';

type NavbarLink = {
  href: string;
  label: string;
};

type NavbarProps = {
  title: string;
  links?: NavbarLink[];
};

export const Navbar = ({ title, links = [] }: NavbarProps) => {
  const { signout } = useAuth();
  const navigate = useNavigate();

  return (
    <Flex className="h-16 items-center justify-between">
      <Flex className="gap-4">
        <RiMagicFill />
        <h2>{title}</h2>
      </Flex>
      <Flex>
        {links.map(link => {
          return <Link to={link.href}>{link.label}</Link>;
        })}
        <Button onClick={() => signout(() => navigate('/auth', { replace: true }))}>
          <MdExitToApp />
        </Button>
      </Flex>
    </Flex>
  );
};
