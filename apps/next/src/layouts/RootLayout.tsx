import { Box, Button, Card, Flex, Nav, Text } from '@violetit/ui';

import { PreloadedQuery, usePreloadedQuery } from 'react-relay';
import { RiMagicFill, RiMenuFill } from 'react-icons/ri';
import { motion, AnimatePresence } from 'framer-motion';
import { MdExitToApp } from 'react-icons/md';
import { useRouter } from 'next/router';
import { graphql } from 'relay-runtime';
import { useContext } from 'react';

import { RootLayoutQuery as RootLayoutQueryType } from 'src/__generated__/RootLayoutQuery.graphql';
import { CommunityPopup } from 'src/components/Community/CommunityPopup';
import { AuthContext } from 'src/contexts/AuthContext';
import { ToggleTheme } from 'src/components/Shared/ToggleTheme';
import { SearchBar } from 'src/components/Search/SearchBar';
import { Backdrop } from 'src/components/Shared/Backdrop';
import { useModal } from 'src/hooks/useModal';
import { Link } from 'src/components/Shared/Link';

const RootLayoutQuery = graphql`
  query RootLayoutQuery {
    ...SearchBarFragment
  }
`;

interface RootLayoutProps {
  children?: React.ReactNode;
  queryRef: PreloadedQuery<RootLayoutQueryType>;
}

const RootLayout = ({ children, queryRef }: RootLayoutProps) => {
  const { signout } = useContext(AuthContext);
  const { push } = useRouter();

  const data = usePreloadedQuery<RootLayoutQueryType>(RootLayoutQuery, queryRef);

  const { modalOpen, toggleModal, closeModal } = useModal();

  const handleSignout = () => {
    signout(() => push('/auth/signin'));
  };

  if (!data) {
    return null;
  }

  return (
    <main className="h-screen">
      <Backdrop isOpen={modalOpen} handleClose={closeModal} />
      <Nav className="sticky top-0">
        <Link href={'/'} underline={false}>
          <Flex className="mr-4 items-center justify-between gap-2">
            <RiMagicFill className="h-6 w-6 text-orange-700 sm:mr-0" />
            <Text weight="semibold" variant="p2">
              Violetit
            </Text>
          </Flex>
        </Link>
        {/* TODO: abstract */}
        <Box className="hidden gap-2 sm:flex">
          <SearchBar fragmentKey={data} />
          <CommunityPopup />
          <ToggleTheme />
          <Button variant="neutral" aria-label="Log out" onClick={handleSignout}>
            <MdExitToApp className="h-6 w-6" />
          </Button>
        </Box>
        <Box className="flex gap-2 sm:hidden">
          <CommunityPopup />
          <ToggleTheme />
          <Button variant="neutral" type="button" className="sm:hidden" onClick={toggleModal}>
            <RiMenuFill className="h-6 w-4" />
          </Button>
        </Box>
        <AnimatePresence>
          {modalOpen ? (
            <motion.div
              className="fixed left-0 right-0 top-12 flex flex-col gap-2 px-2 py-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Card className="shadow-lg">
                <SearchBar fragmentKey={data} />
              </Card>
              <Card className="flex flex-col gap-2 p-2 shadow-xl">
                <Button variant="neutral" aria-label="Log out" onClick={handleSignout}>
                  <MdExitToApp className="h-6 w-6" />
                  <Text variant="p2" weight="semibold">
                    Exit
                  </Text>
                </Button>
              </Card>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </Nav>
      {children}
    </main>
  );
};

export default RootLayout;
