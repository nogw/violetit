import { useMemo } from 'react';
import { IoFlagOutline } from 'react-icons/io5';
import { HiFire } from 'react-icons/hi';

import { FeedSortFilter } from 'src/hooks/useFeedFilter';
import { Button, Card } from '@violetit/ui';

type FeedFilterProps = {
  feedFilter: FeedSortFilter;
  handleNewPosts: () => void;
  handleHotPosts: () => void;
};

export const FeedFilter = ({ feedFilter, handleNewPosts, handleHotPosts }: FeedFilterProps) => {
  const getVariantButton = useMemo(() => {
    return (name: FeedSortFilter['current']) => {
      return feedFilter.current === name ? 'secondary' : 'neutral';
    };
  }, [feedFilter]);

  return (
    <Card className="mb-2 gap-2">
      <Button
        aria-label="Show new posts"
        variant={getVariantButton('New')}
        startIcon={IoFlagOutline}
        onClick={handleNewPosts}
      >
        New
      </Button>
      <Button
        aria-label="Show top rated posts"
        variant={getVariantButton('Hot')}
        startIcon={HiFire}
        onClick={handleHotPosts}
      >
        Top rated
      </Button>
    </Card>
  );
};
