import { Flex } from './Flex';
import { Card } from './Card';
import { CardContent } from './CardContent';
import { VoteButton } from './VoteButton';

const VotesSkeleton = () => {
  return (
    <Flex className="shrink-0 w-10">
      <Flex className="flex-col grow items-center">
        <VoteButton aria-label="upvote" direction="up" />
        <div className="my-2" />
        <VoteButton aria-label="down" direction="down" />
      </Flex>
    </Flex>
  );
};

export const LoadingPostSkeleton = () => {
  return (
    <Card className="py-2 rounded border border-solid border-gray-100 hover:border-gray-400">
      <VotesSkeleton />
      <CardContent className="animate-pulse flex-1">
        <div className="flex-1 space-y-4 py-1">
          <div className="h-2 w-52 bg-gray-100 rounded" />
          <div className="h-4 w-80 bg-gray-100 rounded" />
          <div className="space-y-2">
            <div className="h-14 bg-gray-100 rounded" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
