import { Box, Flex, TextField } from '@violetit/ui';

import { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { graphql, useLazyLoadQuery } from 'react-relay';
import { useLocation } from 'react-router-dom';

import { SearchBarQuery } from './__generated__/SearchBarQuery.graphql';
import { SearchList } from './SearchList';

export const SearchBar = () => {
  const [showResults, setShowResults] = useState(false);
  const [search, setSearch] = useState('');
  const location = useLocation();

  const query = useLazyLoadQuery<SearchBarQuery>(
    graphql`
      query SearchBarQuery {
        ...SearchList_query
      }
    `,
    {},
  );

  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (resultsRef.current?.contains(event.target as Node) || inputRef.current?.contains(event.target as Node)) {
        return;
      }

      setShowResults(false);
    },
    [resultsRef, inputRef],
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    setShowResults(false);
    setSearch('');

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside, location]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setShowResults(true);
  };

  return (
    <Flex className="relative">
      <TextField
        placeholder="Search on Violetit"
        value={search}
        onChange={e => handleSearch(e)}
        aria-required={false}
        aria-label="Search communities on Violetit"
      />
      {showResults && (
        <Box className="absolute mt-8 w-full" ref={resultsRef}>
          <Suspense fallback={<h1>a</h1>}>
            <SearchList query={query} search={search} />
          </Suspense>
        </Box>
      )}
    </Flex>
  );
};
