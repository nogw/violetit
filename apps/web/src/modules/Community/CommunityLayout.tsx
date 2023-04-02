import { Flex, Box, ErrorText } from '@violetit/ui';

import { useLazyLoadQuery } from 'react-relay';
import { graphql } from 'relay-runtime';

import { CommunityLayoutMeQuery } from './__generated__/CommunityLayoutMeQuery.graphql';
import { CommunityHeader } from './CommunityHeader';
import { CommunityInfo } from './CommunityInfo';

const CommunityLayoutMe = graphql`
  query CommunityLayoutMeQuery($id: ID!) {
    community: node(id: $id) {
      ...CommunityHeader_community
      ...CommunityInfo_community
    }
  }
`;

type CommunityLayoutProps = {
  id: string;
  withInfo: boolean;
  children: React.ReactElement;
};

export const CommunityLayout = ({ id, withInfo, children }: CommunityLayoutProps) => {
  const data = useLazyLoadQuery<CommunityLayoutMeQuery>(CommunityLayoutMe, { id });

  if (!data || !data.community) {
    return (
      <Box className="mx-4">
        <ErrorText>Community not found</ErrorText>
      </Box>
    );
  }

  return (
    <Box>
      <CommunityHeader community={data.community} />
      <Flex isFullWidth className="gap-2 px-2 pb-2">
        {children}
        {withInfo ? <CommunityInfo community={data.community} /> : null}
      </Flex>
    </Box>
  );
};
