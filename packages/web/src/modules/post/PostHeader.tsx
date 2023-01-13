import { Flex } from '@violetit/ui';

import { timeAgo } from '@/lib/timeAgo';
import { Link } from '@/shared-components/Link';

type PostHeaderProps = {
  community: string;
  author: string;
  createdAt: Date;
};

const PostHeader = ({ community, author, createdAt }: PostHeaderProps) => {
  return (
    <Flex className="text-xs text-gray-500 gap-2">
      <Link to={`/u/${author}`}>
        <h3 className="text-black font-medium">{`r/${community}`}</h3>
      </Link>
      <p className="text-gray-400">•</p>
      <Flex className="gap-1">
        <p>Posted by</p>
        <Link to={`/u/${author}`}>
          <p className="mr-1 text-gray-500 font-normal">{`u/${author}`}</p>
        </Link>
        <p>{`${timeAgo(createdAt)} ago`}</p>
      </Flex>
    </Flex>
  );
};

export default PostHeader;
