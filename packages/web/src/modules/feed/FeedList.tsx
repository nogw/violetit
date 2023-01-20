import { LoadingPostSkeleton } from '@violetit/ui';

import {
  graphql,
  GraphQLTaggedNode,
  useLazyLoadQuery,
  usePaginationFragment,
} from 'react-relay';

import InfiniteScroll from 'react-infinite-scroller';

import { FeedListPostsPaginationQuery } from './__generated__/FeedListPostsPaginationQuery.graphql';
import { FeedListPosts$key } from './__generated__/FeedListPosts.graphql';

import { PostDetail } from '../post/PostDetail';

const FeedListFragment = graphql`
  fragment FeedList_query on Query
  @argumentDefinitions(
    first: { type: Int, defaultValue: 10 }
    after: { type: String }
  )
  @refetchable(queryName: "FeedListPaginationQuery") {
    posts(first: $first, after: $after)
      @connection(key: "Feed_posts", filters: []) {
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
  lazyLoadQuery: GraphQLTaggedNode;
};

export const FeedList = ({ lazyLoadQuery }: FeedListProps) => {
  // todo: refactor 'query'
  const query = useLazyLoadQuery<FeedListPostsPaginationQuery>(
    lazyLoadQuery,
    {},
  );

  const { data, loadNext, isLoadingNext } = usePaginationFragment<
    FeedListPostsPaginationQuery,
    FeedListPosts$key
  >(FeedListFragment, query);

  const loadMore = () => {
    if (isLoadingNext) {
      return;
    }

    loadNext(5);
  };

  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={loadMore}
      loader={<LoadingPostSkeleton />}
      hasMore={data.posts.pageInfo.hasNextPage}
      useWindow
    >
      {data.posts.edges.map(post => {
        if (post && post.node) {
          return <PostDetail key={post.node.id} post={post.node} />;
        }

        return null;
      })}
    </InfiniteScroll>
  );
};
