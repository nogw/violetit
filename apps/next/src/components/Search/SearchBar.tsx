import { Card, Flex, Loading, TextField } from '@violetit/ui';

import { Suspense, useCallback, useEffect, useState } from 'react';
import { graphql, useFragment } from 'react-relay';
import { useDebounce } from 'use-debounce';
import { useRouter } from 'next/router';

import { SearchBarFragment$key } from 'src/__generated__/SearchBarFragment.graphql';
import { useClickOutside } from 'src/hooks/useClickOutside';
import { SearchList } from './SearchList';

const SearchBarFragment = graphql`
  fragment SearchBarFragment on Query {
    ...SearchList_query
  }
`;

type SearchBarProps = {
  fragmentKey: SearchBarFragment$key;
};

export const SearchBar = ({ fragmentKey }: SearchBarProps) => {
  const { pathname } = useRouter();

  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState('');

  const [debouncedSearchText] = useDebounce(searchText, 200);
  const query = useFragment(SearchBarFragment, fragmentKey);

  useEffect(() => {
    setIsSearching(false);
    setSearchText('');
  }, [pathname]);

  const { elementRef } = useClickOutside<HTMLDivElement>(() => {
    setIsSearching(false);
  });

  const handleSearch = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
    setIsSearching(true);
  }, []);

  const showSearchList = isSearching && debouncedSearchText && !!searchText.length;

  return (
    <Flex fullWidth ref={elementRef} className="relative">
      <TextField
        role="search"
        value={searchText}
        onChange={e => handleSearch(e)}
        autoComplete="off"
        placeholder="Search on Violetit"
        aria-label="Search communities on Violetit"
      />
      {showSearchList && (
        <Card className="absolute mt-10 w-full flex-col p-0 shadow-xl">
          <Suspense fallback={<Loading />}>
            <SearchList fragmentKey={query} search={debouncedSearchText} />
          </Suspense>
        </Card>
      )}
    </Flex>
  );
};
