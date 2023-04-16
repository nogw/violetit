import { Flex } from '@violetit/ui';

import { PreloadedQuery, usePreloadedQuery } from 'react-relay';
import { graphql } from 'relay-runtime';

import { CommunityLayoutQuery as CommunityLayoutQueryType } from 'src/__generated__/CommunityLayoutQuery.graphql';
import { CommunityHeader } from 'src/components/Community/CommunityHeader';
import { CommunityInfo } from 'src/components/Community/CommunityInfo';

const CommunityLayoutQuery = graphql`
  query CommunityLayoutQuery($id: String!) {
    community(id: $id) {
      ...CommunityHeader_community
      ...CommunityInfo_community
    }
  }
`;

interface CommunityLayoutProps {
  withInfo?: boolean;
  children?: React.ReactNode;
  queryRef: PreloadedQuery<CommunityLayoutQueryType>;
}

const CommunityLayout = ({ withInfo, children, queryRef }: CommunityLayoutProps) => {
  const data = usePreloadedQuery<CommunityLayoutQueryType>(CommunityLayoutQuery, queryRef);

  if (!data.community) {
    return null;
  }

  return (
    <main className="h-screen">
      <CommunityHeader fragmentKey={data.community} />
      <Flex fullWidth className="gap-2 px-2 pb-2">
        {children}
        {withInfo && <CommunityInfo fragmentKey={data.community} />}
      </Flex>
    </main>
  );
};

export default CommunityLayout;
