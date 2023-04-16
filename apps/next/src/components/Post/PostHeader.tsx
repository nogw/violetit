import { Flex, Text } from '@violetit/ui';

import { graphql, useFragment } from 'react-relay';

import { PostHeader_post$key } from 'src/__generated__/PostHeader_post.graphql';
import { useIsMounted } from 'src/hooks/useIsMounted';
import { timeAgo } from 'src/utils/date';
import { Link } from 'src/components/Shared/Link';

type PostHeaderProps = {
  fragmentKey: PostHeader_post$key;
};

export const PostHeader = (props: PostHeaderProps) => {
  const isMounted = useIsMounted();

  const post = useFragment<PostHeader_post$key>(
    graphql`
      fragment PostHeader_post on Post {
        createdAt
        author {
          username
        }
        community {
          id
          name
        }
      }
    `,
    props.fragmentKey,
  );

  const { author, community } = post;

  return (
    <Flex className="items-center gap-2">
      <Link href={`/community/${community?.id}`}>
        <Text variant="p4">{`r/${community?.name}`}</Text>
      </Link>
      <Text color="secondary" variant="p4">
        {'•'}
      </Text>
      <Flex className="gap-1">
        <Text color="secondary" variant="p4">{`Posted by u/${author?.username}`}</Text>
        <Text color="secondary" variant="p4">
          {isMounted && timeAgo(new Date(post.createdAt || ''))}
        </Text>
      </Flex>
    </Flex>
  );
};
