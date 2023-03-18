import { Box, Flex, TextField } from '@violetit/ui';

import { Suspense, useState } from 'react';
import { graphql, useLazyLoadQuery } from 'react-relay';

import { SearchList } from './SearchList';
import { SearchQuery } from './__generated__/SearchQuery.graphql';

export const SearchPage = () => {
  const [search, setSearch] = useState('');

  const query = useLazyLoadQuery<SearchQuery>(
    graphql`
      query SearchPageQuery {
        ...SearchList_query
      }
    `,
    {},
  );

  return (
    <Flex className="relative">
      <TextField placeholder="Search on Violetit" value={search} onChange={e => setSearch(e.target.value)} />
      <Box className="absolute mt-6">
        <Suspense fallback={<h1>a</h1>}>
          <SearchList query={query} search={search} />
        </Suspense>
      </Box>
    </Flex>
  );
};
