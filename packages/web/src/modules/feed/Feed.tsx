import { Flex } from '@violetit/ui';

import { useLazyLoadQuery } from 'react-relay';
import { graphql } from 'relay-runtime';

import { FeedListPaginationQuery } from './__generated__/FeedListPaginationQuery.graphql';
import { PostComposer } from '../post/PostComposer';
import { FeedList } from './FeedList';

const feedPostsLazyLoadQuery = graphql`
  query FeedPostsQuery {
    ...FeedList_query
  }
`;

type FeedProps = {
  community?: string;
};

export const Feed = (props: FeedProps) => {
  const query = useLazyLoadQuery<FeedListPaginationQuery>(feedPostsLazyLoadQuery, {});

  return (
    <Flex className="flex-col w-full">
      <PostComposer community={props.community} />
      <FeedList query={query} queryVariables={props} />
    </Flex>
  );
};
