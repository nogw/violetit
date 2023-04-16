import { Flex } from '@violetit/ui';

import type { FeedQueryVariables } from 'src/hooks/useFeedFilter';
import { useFeedFilter } from 'src/hooks/useFeedFilter';

import { FeedListFragment$key } from 'src/__generated__/FeedListFragment.graphql';
import { PostCreate } from '../Post/PostCreate';
import { FeedFilter } from './FeedFilter';
import { FeedList } from './FeedList';

type FeedProps = {
  fragmentKey: FeedListFragment$key;
  initialVariables?: FeedQueryVariables;
};

export const Feed = ({ fragmentKey, initialVariables = {} }: FeedProps) => {
  const { feedFilter, ...handlers } = useFeedFilter(initialVariables);
  const { variables } = feedFilter;

  return (
    <Flex direction="col" fullWidth>
      <PostCreate />
      <FeedFilter feedFilter={feedFilter} {...handlers} />
      <FeedList fragmentKey={fragmentKey} queryVariables={variables} />
    </Flex>
  );
};
