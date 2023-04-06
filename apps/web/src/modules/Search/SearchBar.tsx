import { Card, Flex, Loading, TextField } from '@violetit/ui';

import { Suspense, useCallback, useEffect, useState } from 'react';
import { graphql, useLazyLoadQuery } from 'react-relay';

import { SearchBarQuery } from './__generated__/SearchBarQuery.graphql';
import { SearchList } from './SearchList';
import { useClickOutside } from 'src/hooks/useClickOutside';
import { useLocation } from 'react-router-dom';
import { useDebounce } from 'use-debounce';

export const SearchBar = () => {
  const location = useLocation();

  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState('');

  const [debouncedSearchText] = useDebounce(searchText, 200);

  const query = useLazyLoadQuery<SearchBarQuery>(
    graphql`
      query SearchBarQuery($filters: CommunityFilters) {
        ...SearchList_query @arguments(filters: $filters)
      }
    `,
    { filters: { search: debouncedSearchText } },
  );

  useEffect(() => {
    setIsSearching(false);
    setSearchText('');
  }, [location]);

  const { elementRef } = useClickOutside<HTMLDivElement>(() => {
    setIsSearching(false);
  });

  const handleSearch = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
    setIsSearching(true);
  }, []);

  const showSearchList = isSearching && debouncedSearchText && !!searchText.length;

  return (
    <Flex className="relative" ref={elementRef}>
      <TextField
        placeholder="Search on Violetit"
        value={searchText}
        onChange={e => handleSearch(e)}
        autoComplete="off"
        role="search"
        aria-required={false}
        aria-label="Search communities on Violetit"
      />
      {showSearchList && (
        <Card className="absolute mt-10 w-full flex-col p-0">
          <Suspense fallback={<Loading />}>
            <SearchList query={query} search={debouncedSearchText} />
          </Suspense>
        </Card>
      )}
    </Flex>
  );
};
