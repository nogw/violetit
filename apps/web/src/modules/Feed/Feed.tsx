import { Flex } from '@violetit/ui';

import { useLazyLoadQuery } from 'react-relay';
import { graphql } from 'relay-runtime';

import { FeedListPaginationQuery } from './__generated__/FeedListPaginationQuery.graphql';
import { PostCreate } from 'src/modules/Post/PostCreate';
import { FeedList } from './FeedList';

const feedPostsLazyLoadQuery = graphql`
  query FeedPostsQuery {
    ...FeedList_query
  }
`;

type FeedProps = {
  community?: string;
  tags?: string;
};

export const Feed = (props: FeedProps) => {
  const query = useLazyLoadQuery<FeedListPaginationQuery>(feedPostsLazyLoadQuery, {});

  return (
    <Flex className="w-full flex-col">
      <PostCreate />
      <FeedList query={query} queryVariables={props} />
    </Flex>
  );
};
