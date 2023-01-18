import { Flex } from '@violetit/ui';

import { timeAgo } from '@/lib/timeAgo';
import { Link } from '@/shared-components/Link';
import { graphql, useFragment } from 'react-relay';
import { PostHeader_post$key } from './__generated__/PostHeader_post.graphql';

type PostHeaderProps = {
  post: PostHeader_post$key;
};

const PostHeader = (props: PostHeaderProps) => {
  const post = useFragment<PostHeader_post$key>(
    graphql`
      fragment PostHeader_post on Post {
        id
        author {
          username
        }
        community {
          name
        }
        createdAt
      }
    `,
    props.post,
  );

  const { author, community } = post;

  return (
    <Flex className="text-xs text-gray-500 gap-2">
      <Link to={`/u/${community?.name}`}>
        <h3 className="text-black font-medium">{`r/${community?.name}`}</h3>
      </Link>
      <p className="text-gray-400">•</p>
      <Flex className="gap-1">
        <p>Posted by</p>
        <Link to={`/u/${author?.username}`}>
          <p className="mr-1 text-gray-500 font-normal">{`u/${author?.username}`}</p>
        </Link>
        <p>{`${timeAgo(new Date(post.createdAt || ''))} ago`}</p>
      </Flex>
    </Flex>
  );
};

export default PostHeader;
