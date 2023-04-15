import { Button } from '@violetit/ui';

import { PreloadedQuery, usePreloadedQuery } from 'react-relay';
import { MdExitToApp } from 'react-icons/md';
import { useContext } from 'react';
import { useRouter } from 'next/router';
import { graphql } from 'relay-runtime';

import { RootLayoutQuery as RootLayoutQueryType } from 'src/__generated__/RootLayoutQuery.graphql';
import { AuthContext } from 'src/contexts/AuthContext';
import { CommunityPopup } from 'src/components/Community/CommunityPopup';
import { ThemeSelect } from 'src/components/Shared/ThemeSelect';
import { SearchBar } from 'src/components/Search/SearchBar';
import { AppBar } from 'src/components/Shared/AppBar';

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
  const data = usePreloadedQuery<RootLayoutQueryType>(RootLayoutQuery, queryRef);

  const { signout } = useContext(AuthContext);
  const { push } = useRouter();

  if (!data) {
    return null;
  }

  return (
    <main className="h-screen">
      <AppBar title="Violetit">
        <SearchBar fragmentKey={data} />
        <CommunityPopup />
        <ThemeSelect />
        <Button variant="neutral" aria-label="Log out" onClick={() => signout(() => push('/auth/signin'))}>
          <MdExitToApp className="h-6 w-6" />
        </Button>
      </AppBar>
      {children}
    </main>
  );
};

export default RootLayout;
