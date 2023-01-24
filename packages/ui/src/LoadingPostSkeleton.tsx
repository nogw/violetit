import { Flex } from './Flex';
import { Card } from './Card';
import { CardContent } from './CardContent';
import { VoteButton } from './VoteButton';

const VotesSkeleton = () => {
  return (
    <div className="w-8">
      <Flex className="flex-col grow items-center">
        <VoteButton aria-label="upvote" direction="up" />
        <div className="my-3" />
        <VoteButton aria-label="down" direction="down" />
      </Flex>
    </div>
  );
};

export const LoadingPostSkeleton = () => {
  return (
    <Card className="hover:border-gray-400">
      <VotesSkeleton />
      <CardContent className="animate-pulse flex-1">
        <Flex className="flex-col space-y-4">
          <div className="h-2 w-52 bg-gray-200 rounded" />
          <div className="h-4 w-80 bg-gray-200 rounded" />
          <div className="space-y-2">
            <div className="h-14 bg-gray-200 rounded" />
          </div>
        </Flex>
      </CardContent>
    </Card>
  );
};
