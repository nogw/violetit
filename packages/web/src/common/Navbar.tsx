import {
  Button,
  Flex,
  //  Input
} from '@violetit/ui';

import { RiMagicFill } from 'react-icons/ri';
import { MdExitToApp } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
// import { BiSearch } from 'react-icons/bi';

import { CommunityComposerPopup } from '../modules/community/CommunityComposerPopup';
import { useAuth } from '../modules/auth/useAuth';
import { Link } from './Link';
// import { SearchPage } from '@/modules/search/SearchPage';

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
      <Flex className="items-center gap-2">
        {links.map(link => {
          return <Link to={link.href}>{link.label}</Link>;
        })}
        <CommunityComposerPopup />
        <Button variant="neutral" onClick={() => signout(() => navigate('/auth', { replace: true }))}>
          <MdExitToApp className="h-6 w-6" />
        </Button>
      </Flex>
    </Flex>
  );
};
