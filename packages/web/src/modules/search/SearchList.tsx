import { Card, Flex } from '@/../../ui/src';
import {
  // useCallback,
  useEffect,
  useTransition,
} from 'react';
// import InfiniteScroll from 'react-infinite-scroller';
import { graphql, usePaginationFragment } from 'react-relay';
import { SearchListPaginationQuery } from './__generated__/SearchListPaginationQuery.graphql';
import { SearchList_query$key } from './__generated__/SearchList_query.graphql';

const SearchListFragment = graphql`
  fragment SearchList_query on Query
  @argumentDefinitions(
    first: { type: Int, defaultValue: 20 }
    after: { type: String }
    filters: { type: CommunityFilters, defaultValue: { search: "" } }
  )
  @refetchable(queryName: "SearchListPaginationQuery") {
    communities(first: $first, after: $after, filters: $filters) @connection(key: "SearchList_communities") {
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
          name
          title
          joined
          members {
            count
          }
        }
      }
    }
  }
`;

type SearchListProps = {
  search: string;
  query: SearchList_query$key;
};

export const SearchList = ({ search, query }: SearchListProps) => {
  const [, startTransition] = useTransition();

  const { data, refetch } = usePaginationFragment<SearchListPaginationQuery, SearchList_query$key>(
    SearchListFragment,
    query,
  );

  useEffect(() => {
    startTransition(() => {
      const variables = { first: 10, filters: { search } };
      refetch(variables, { fetchPolicy: 'store-or-network' });
    });
  }, [search, refetch]);

  return (
    <Flex className="mt-2 w-auto flex-col">
      {data.communities.edges.map(post => {
        return (
          <Card key={post?.node?.id} className="flex cursor-pointer flex-col">
            <h1>r/{post?.node?.name}</h1>
            <h2>Community • {post?.node?.members.count} members</h2>
          </Card>
        );
      })}
    </Flex>
  );
};
