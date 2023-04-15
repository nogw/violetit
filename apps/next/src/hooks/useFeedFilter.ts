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

export const useFeedFilter = ({ trending, ...variables }: FeedQueryVariables = {}) => {
  const [feedSort, setFeedSort] = useState<FeedStateProps>({
    current: 'New',
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
    return {
      current: feedSort.current,
      variables: { trending, ...variables },
    };
  }, [feedSort, trending, variables]);

  return { feedFilter, handleNewPosts, handleHotPosts };
};
