import { Flex } from '@violetit/ui';

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
    <Flex className="h-10 items-center justify-between bg-white px-4">
      <Flex className="items-center justify-between gap-3">
        <RiMagicFill className="h-6 w-6 text-orange-700" />
        <Link className="text-lg font-bold" to={'/'}>
          {title}
        </Link>
      </Flex>
      <Flex>
        {links.map(link => {
          return <Link to={link.href}>{link.label}</Link>;
        })}
        <button onClick={() => signout(() => navigate('/auth', { replace: true }))}>
          <MdExitToApp />
        </button>
      </Flex>
    </Flex>
  );
};
