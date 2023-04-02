import { Button, Card, Flex } from '@violetit/ui';

import { useLazyLoadQuery } from 'react-relay';
import { graphql } from 'relay-runtime';
import { IoFlagOutline } from 'react-icons/io5';
import { HiFire } from 'react-icons/hi';

import { FeedListPaginationQuery } from './__generated__/FeedListPaginationQuery.graphql';
import { PostCreate } from '../Post/PostCreate';
import { FeedList } from './FeedList';
import { useMemo, useState } from 'react';

const feedPostsLazyLoadQuery = graphql`
  query FeedPostsQuery {
    ...FeedList_query
  }
`;

type FeedProps = {
  community?: string;
  trending?: boolean;
  tags?: string;
};

type FeedStateProps = {
  current: 'New' | 'Hot';
  variables: FeedProps;
};

export const Feed = (props: FeedProps) => {
  const [queryVariables, setQueryVariables] = useState<FeedStateProps>({
    current: 'New',
    variables: props,
  });

  const query = useLazyLoadQuery<FeedListPaginationQuery>(feedPostsLazyLoadQuery, {});

  const handleNewPosts = () => {
    setQueryVariables({
      current: 'New',
      variables: { ...queryVariables.variables, trending: false },
    });
  };

  const handleHotPosts = () => {
    setQueryVariables({
      current: 'Hot',
      variables: { ...queryVariables.variables, trending: true },
    });
  };

  const getVariantButton = useMemo(() => {
    return (name: 'New' | 'Hot') => {
      return queryVariables.current === name ? 'secondary' : 'neutral';
    };
  }, [queryVariables]);

  return (
    <Flex direction="col" isFullWidth>
      <PostCreate />
      <Card className="mb-2 gap-2">
        <Button variant={getVariantButton('New')} onClick={handleNewPosts} aria-label="Show new posts">
          <IoFlagOutline /> New
        </Button>
        <Button variant={getVariantButton('Hot')} onClick={handleHotPosts} aria-label="Show top rated posts">
          <HiFire /> Top rated
        </Button>
      </Card>
      <FeedList query={query} queryVariables={queryVariables.variables} />
    </Flex>
  );
};
