import { Box, Flex, Text } from '@violetit/ui';

import { graphql, usePaginationFragment } from 'react-relay';
import { useEffect, useTransition } from 'react';
import clsx from 'clsx';

import { SearchListPaginationQuery } from 'src/__generated__/SearchListPaginationQuery.graphql';
import { SearchList_query$key } from 'src/__generated__/SearchList_query.graphql';
import { useIsMounted } from 'src/hooks/useIsMounted';
import { Link } from 'src/components/Shared/Link';

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
  fragmentKey: SearchList_query$key;
};

export const SearchList = ({ search, fragmentKey }: SearchListProps) => {
  const [_, startTransition] = useTransition();
  const isMounted = useIsMounted();

  const { data, refetch } = usePaginationFragment<SearchListPaginationQuery, SearchList_query$key>(
    SearchListFragment,
    fragmentKey,
  );

  useEffect(() => {
    if (isMounted) {
      const variables = { first: 5, filters: { search } };

      startTransition(() => {
        refetch(variables, { fetchPolicy: 'store-or-network' });
      });
    }
  }, [isMounted, search, refetch]);

  if (!data.communities.edges.length) {
    return (
      <Box className="p-2">
        <Text variant="p4" color="secondary" clamp>
          No community found for &quot;{search}&quot;
        </Text>
      </Box>
    );
  }

  const communities = data.communities.edges.flatMap(edge => {
    return edge?.node ?? [];
  });

  return (
    <Flex fullWidth direction="col">
      {communities.map(({ id, name, members }) => {
        return (
          <Link key={id} href={`community/${id}`} underline={false}>
            <Flex className={clsx('flex-col rounded', 'm-1 p-1', 'hover:bg-gray-100 dark:hover:bg-neutral-800')}>
              <Text variant="p4" weight="semibold">
                r/{name}
              </Text>
              <Text variant="p4" color="secondary">
                {members.count} members
              </Text>
            </Flex>
          </Link>
        );
      })}
    </Flex>
  );
};
