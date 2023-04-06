import { Flex, Text } from '@violetit/ui';

import { graphql, usePaginationFragment } from 'react-relay';
import { useEffect, useTransition } from 'react';

import { SearchListPaginationQuery } from './__generated__/SearchListPaginationQuery.graphql';
import { SearchList_query$key } from './__generated__/SearchList_query.graphql';
import { Link } from '../../common/Link';
import { useIsMounted } from 'src/hooks/useIsMounted';

const SearchListFragment = graphql`
  fragment SearchList_query on Query
  @argumentDefinitions(
    first: { type: Int, defaultValue: 5 }
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
  const [_, startTransition] = useTransition();
  const isMounted = useIsMounted();

  const { data, refetch } = usePaginationFragment<SearchListPaginationQuery, SearchList_query$key>(
    SearchListFragment,
    query,
  );

  useEffect(() => {
    if (isMounted) {
      startTransition(() => {
        const variables = { first: 5, filters: { search } };
        refetch(variables, { fetchPolicy: 'store-or-network' });
      });
    }
  }, [isMounted, search, refetch]);

  if (!data.communities.edges.length) {
    return (
      <Text variant="p4" color="secondary" clamp>
        No community found for "{search}"
      </Text>
    );
  }

  return (
    <Flex isFullWidth direction="col">
      {data.communities.edges.map(post => {
        return (
          <Link key={post?.node?.id} to={`r/${post?.node?.id}`} underline={false}>
            <Flex className="m-1 flex-col rounded p-1 hover:bg-gray-100 dark:hover:bg-neutral-800">
              <Text variant="p4" weight="semibold">
                r/{post?.node?.name}
              </Text>
              <Text variant="p4" color="secondary">
                {post?.node?.members.count} members
              </Text>
            </Flex>
          </Link>
        );
      })}
    </Flex>
  );
};
