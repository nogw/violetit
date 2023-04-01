import { Button, Flex } from '@violetit/ui';

import { useContext } from 'react';
import { RiMagicFill } from 'react-icons/ri';
import { MdExitToApp } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import { CommunityCreatePopup } from '../modules/Community/CommunityCreatePopup';
import { ThemeContext } from '../providers/ThemeContext';
import { SearchBar } from '../modules/Search/SearchBar';
import { useAuth } from '../modules/Auth/useAuth';
import { Link } from './Link';

type NavbarProps = {
  title: string;
};

export const Navbar = ({ title }: NavbarProps) => {
  const { theme, handleChange } = useContext(ThemeContext);

  const { signout } = useAuth();
  const navigate = useNavigate();

  return (
    <Flex className="h-12 items-center justify-between bg-white px-4 dark:bg-neutral-900">
      <Flex className="items-center justify-between gap-3">
        <RiMagicFill className="h-6 w-6 text-orange-700" />
        <Link className="text-lg font-bold dark:text-white" to={'/'}>
          {title}
        </Link>
      </Flex>
      <Flex className="h-full items-center gap-2">
        <SearchBar />
        <CommunityCreatePopup />
        <Button variant="neutral" aria-label="Switch theme" onClick={handleChange}>
          {theme === 'dark' ? 'Light' : 'Dark'}
        </Button>
        <Button
          variant="neutral"
          aria-label="Log out"
          onClick={() => signout(() => navigate('/auth', { replace: true }))}
        >
          <MdExitToApp className="h-6 w-6" />
        </Button>
      </Flex>
    </Flex>
  );
};
