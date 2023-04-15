import { LoadingPostSkeleton } from '@violetit/ui';

import { graphql, usePaginationFragment } from 'react-relay';
import { useCallback, useEffect, useTransition } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import type { FeedQueryVariables } from 'src/hooks/useFeedFilter';
import { FeedListFragment$key } from 'src/__generated__/FeedListFragment.graphql';
import { FeedList_posts } from 'src/__generated__/FeedList_posts.graphql';
import { PostDetail } from 'src/components/Post/PostDetail';
import { useIsMounted } from 'src/hooks/useIsMounted';

const FeedListFragment = graphql`
  fragment FeedListFragment on Query
  @argumentDefinitions(first: { type: Int, defaultValue: 10 }, after: { type: String }, filters: { type: PostFilter })
  @refetchable(queryName: "FeedList_posts") {
    posts(first: $first, after: $after, filters: $filters) @connection(key: "Feed_posts") {
      endCursorOffset
      startCursorOffset
      count
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          id
          ...PostDetail_post
        }
      }
    }
  }
`;

type FeedListProps = {
  fragmentKey: FeedListFragment$key;
  queryVariables?: FeedQueryVariables;
};

export const FeedList = ({ fragmentKey, queryVariables }: FeedListProps) => {
  const [_, startTransition] = useTransition();
  const isMounted = useIsMounted();

  const { data, refetch, hasNext, loadNext, isLoadingNext } = usePaginationFragment<
    FeedList_posts,
    FeedListFragment$key
  >(FeedListFragment, fragmentKey);

  useEffect(() => {
    const variables = { first: 10, filters: queryVariables };

    if (isMounted) {
      startTransition(() => {
        refetch(variables, { fetchPolicy: 'store-or-network' });
      });
    }
  }, [isMounted, queryVariables, refetch]);

  const loadMore = useCallback(() => {
    if (!isLoadingNext && hasNext) {
      loadNext(5);
    }
  }, [hasNext, isLoadingNext, loadNext]);

  const filteredPosts = data.posts.edges.flatMap(edge => {
    return edge?.node ?? [];
  });

  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={loadMore}
      loader={<LoadingPostSkeleton key={'skeleton'} />}
      hasMore={data.posts.pageInfo.hasNextPage}
      className="flex flex-col gap-2"
      useWindow
    >
      {filteredPosts.map(node => {
        return <PostDetail key={node.id} fragmentKey={node} />;
      })}
    </InfiniteScroll>
  );
};
