import { Box, Flex } from '@violetit/ui';

import { PreloadedQuery, usePreloadedQuery } from 'react-relay';
import { graphql } from 'relay-runtime';

import { PanelLayoutQuery as PanelLayoutQueryType } from 'src/__generated__/PanelLayoutQuery.graphql';
import { CommunityHeader } from 'src/components/Community/CommunityHeader';

const PanelLayoutQuery = graphql`
  query PanelLayoutQuery($id: String!) {
    community(id: $id) {
      amIOwner
      ...CommunityHeader_community
    }
  }
`;

interface PanelLayoutProps {
  children?: React.ReactNode;
  queryRef: PreloadedQuery<PanelLayoutQueryType>;
}

const PanelLayout = ({ children, queryRef }: PanelLayoutProps) => {
  const data = usePreloadedQuery<PanelLayoutQueryType>(PanelLayoutQuery, queryRef);

  if (!data.community || !data.community.amIOwner) {
    return null;
  }

  return (
    <main className="h-screen">
      <CommunityHeader fragmentKey={data.community} />
      <Flex isFullWidth className="gap-2 px-2 pb-2">
        <Box>{children}</Box>
      </Flex>
    </main>
  );
};

export default PanelLayout;
