import { LoadingPostSkeleton } from '@violetit/ui';

import { useCallback, useEffect, useTransition } from 'react';
import { graphql, usePaginationFragment } from 'react-relay';
import InfiniteScroll from 'react-infinite-scroller';

import { FeedListPaginationQuery } from './__generated__/FeedListPaginationQuery.graphql';
import { FeedList_query$key } from './__generated__/FeedList_query.graphql';
import { PostDetail } from 'src/modules/Post/PostDetail';

const FeedListFragment = graphql`
  fragment FeedList_query on Query
  @argumentDefinitions(first: { type: Int, defaultValue: 10 }, after: { type: String }, filters: { type: PostFilter })
  @refetchable(queryName: "FeedListPaginationQuery") {
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
  query: FeedList_query$key;
  queryVariables?: { community?: string };
};

export const FeedList = ({ query, queryVariables }: FeedListProps) => {
  const [, startTransition] = useTransition();

  const { data, refetch, hasNext, loadNext, isLoadingNext } = usePaginationFragment<
    FeedListPaginationQuery,
    FeedList_query$key
  >(FeedListFragment, query);

  useEffect(() => {
    startTransition(() => {
      const variables = { first: 10, filters: queryVariables };
      refetch(variables, { fetchPolicy: 'store-or-network' });
    });
  }, [queryVariables, refetch]);

  const loadMore = useCallback(() => {
    if (isLoadingNext || !hasNext) {
      return;
    }

    loadNext(5);
  }, [hasNext, isLoadingNext, loadNext]);

  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={loadMore}
      loader={<LoadingPostSkeleton key={'skeleton'} />}
      hasMore={data.posts.pageInfo.hasNextPage}
      className="flex flex-col gap-2"
      useWindow
    >
      {data.posts.edges.map(post => {
        if (post && post.node) {
          return <PostDetail key={post.node.id} post={post.node} />;
        }

        return;
      })}
    </InfiniteScroll>
  );
};
