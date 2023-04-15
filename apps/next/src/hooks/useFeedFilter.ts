import { useEffect, useMemo, useState } from 'react';

export type FeedQueryVariables = {
  community?: string;
  trending?: boolean;
  tags?: string;
};

export type FeedSortFilter = {
  current: 'New' | 'Hot';
  variables: FeedQueryVariables;
};

export type FeedStateProps = Omit<FeedSortFilter, 'variables'> & {
  trending: FeedQueryVariables['trending'];
};

export const useFeedFilter = (variables: FeedQueryVariables = {}) => {
  const { trending } = variables;

  const [feedSort, setFeedSort] = useState<FeedStateProps>({
    current: 'Hot',
    trending: trending ?? false,
  });

  const handleNewPosts = () => {
    setFeedSort({ current: 'New', trending: false });
  };

  const handleHotPosts = () => {
    setFeedSort({ current: 'Hot', trending: true });
  };

  useEffect(() => {
    setFeedSort(prevSort => ({
      current: prevSort.current,
      trending: trending ?? prevSort.trending,
    }));
  }, [trending]);

  const feedFilter = useMemo<FeedSortFilter>(() => {
    const { current, trending } = feedSort;

    return {
      current,
      variables: { trending, ...variables },
    };
  }, [feedSort, variables]);

  return { feedFilter, handleNewPosts, handleHotPosts };
};
