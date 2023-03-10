import { Flex, Box, ErrorText } from '@violetit/ui';

import { useLazyLoadQuery } from 'react-relay';
import { graphql } from 'relay-runtime';

import { CommunityHeader } from './CommunityHeader';
import { CommunityInfo } from './CommunityInfo';

import { CommunityLayoutMeQuery } from './__generated__/CommunityLayoutMeQuery.graphql';

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
  children: React.ReactElement;
};

export const CommunityLayout = ({ id, children }: CommunityLayoutProps) => {
  const data = useLazyLoadQuery<CommunityLayoutMeQuery>(CommunityLayoutMe, { id });

  if (!data || !data.community) {
    return <ErrorText>Community not found</ErrorText>;
  }

  return (
    <Box>
      <CommunityHeader community={data.community} />
      <Flex className="gap-2 px-2 w-full">
        {children}
        <CommunityInfo community={data.community} />
      </Flex>
    </Box>
  );
};
