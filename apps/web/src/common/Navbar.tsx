import { Button, Flex } from '@violetit/ui';

import { RiMagicFill } from 'react-icons/ri';
import { MdExitToApp } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import { CommunityCreatePopup } from '../modules/Community/CommunityCreatePopup';
import { SearchBar } from '../modules/Search/SearchBar';
import { useAuth } from '../modules/Auth/useAuth';
import { Link } from './Link';

type NavbarProps = {
  title: string;
};

export const Navbar = ({ title }: NavbarProps) => {
  const { signout } = useAuth();
  const navigate = useNavigate();

  return (
    <Flex className="h-12 items-center justify-between bg-white px-4">
      <Flex className="items-center justify-between gap-3">
        <RiMagicFill className="h-6 w-6 text-orange-700" />
        <Link className="text-lg font-bold" to={'/'}>
          {title}
        </Link>
      </Flex>
      <Flex className="h-full items-center gap-2">
        <SearchBar />
        <CommunityCreatePopup />
        <Button variant="neutral" onClick={() => signout(() => navigate('/auth', { replace: true }))}>
          <MdExitToApp className="h-6 w-6" />
        </Button>
      </Flex>
    </Flex>
  );
};
