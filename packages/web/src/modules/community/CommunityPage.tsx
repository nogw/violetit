import { Flex, Box } from '@violetit/ui';

import { useLazyLoadQuery } from 'react-relay';
import { useParams } from 'react-router-dom';
import { graphql } from 'relay-runtime';

import { CommunityInfo } from './CommunityInfo';
import { CommunityHeader } from './CommunityHeader';
import { Feed } from '../feed/Feed';

import { CommunityPageMeQuery } from './__generated__/CommunityPageMeQuery.graphql';

const CommunityPageMe = graphql`
  query CommunityPageMeQuery($id: ID!) {
    community: node(id: $id) {
      ...CommunityHeader_community
      ...CommunityInfo_community
    }
  }
`;

export const CommunityPage = () => {
  const { id } = useParams();

  const data = useLazyLoadQuery<CommunityPageMeQuery>(CommunityPageMe, {
    id: id as string,
  });

  if (!data || !data.community) {
    return null;
  }

  const { community } = data;

  return (
    <Box>
      <CommunityHeader community={community} />
      <Flex className="gap-2 mx-2">
        <Feed />
        <CommunityInfo community={community} />
      </Flex>
    </Box>
  );
};
