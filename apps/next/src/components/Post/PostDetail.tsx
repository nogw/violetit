import { CardContent, Flex, Heading, Tag, Text } from '@violetit/ui';

import { graphql, useFragment } from 'react-relay';

import { PostDetail_post$key } from 'src/__generated__/PostDetail_post.graphql';
import { VoteButtons } from '../Vote/VoteButtons';
import { PostWrapper } from './PostWrapper';
import { PostHeader } from './PostHeader';
import { PostFooter } from './PostFooter';
import { Link } from 'src/components/Shared/Link';

type PostDetailProps = {
  fragmentKey: PostDetail_post$key;
  isDetail?: boolean;
};

export const PostDetail = (props: PostDetailProps) => {
  const { isDetail = false } = props;

  const post = useFragment<PostDetail_post$key>(
    graphql`
      fragment PostDetail_post on Post {
        id
        title
        content
        community {
          id
        }
        tags {
          id
          label
          color
        }
        ...VoteButtons_post
        ...PostHeader_post
        ...PostFooter_post
      }
    `,
    props.fragmentKey,
  );

  if (!post || !post.community) {
    return null;
  }

  const { id, community } = post;

  const wrapperProps = isDetail ? {} : { href: `/community/${community?.id}/post/${id}` };
  const tagsMapped = post.tags?.flatMap(edge => edge ?? []);

  return (
    <PostWrapper {...wrapperProps}>
      <VoteButtons fragmentKey={post} />
      <CardContent className="px-2 pt-0.5">
        <PostHeader fragmentKey={post} />
        <Flex direction="col" className="my-1 gap-1">
          <Heading variant="h5">
            {post.title}{' '}
            {tagsMapped?.map(({ id, label, color }) => (
              <Link underline={false} key={id} href={`/community/${community?.id}?tags=${id}`}>
                <Tag label={label} color={color} />
              </Link>
            ))}
          </Heading>
          <Text clamp={!isDetail} variant="p4">
            {post.content}
          </Text>
        </Flex>
        <PostFooter post={post} />
      </CardContent>
    </PostWrapper>
  );
};
