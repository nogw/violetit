import { Card, CardContent, Flex, Heading, Tag, Text } from '@violetit/ui';

import { graphql, useFragment } from 'react-relay';
import { Fragment } from 'react';

import { PostDetail_post$key } from './__generated__/PostDetail_post.graphql';
import { PostHeader } from './PostHeader';
import { PostFooter } from './PostFooter';
import { VoteButtons } from 'src/modules/vote/VoteButtons';
import { Link } from 'src/common/Link';

type WrapperProps = {
  to?: string;
  children: React.ReactElement;
};

type PostDetailProps = {
  post: PostDetail_post$key;
  isDetail?: boolean;
};

const Wrapper = ({ to, children }: WrapperProps) => {
  if (to) {
    return (
      <Link className="hover:none" to={to}>
        {children}
      </Link>
    );
  }

  return <Fragment>{children}</Fragment>;
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
          edges {
            node {
              color
              label
            }
          }
        }
        ...VoteButtons_post
        ...PostHeader_post
        ...PostFooter_post
      }
    `,
    props.post,
  );

  const wrapperProps = isDetail ? {} : { to: `/r/${post.community?.id}/${post.id}` };

  const tagsMapped = post.tags ? post.tags.edges.flatMap(edge => (edge?.node ? edge.node : [])) : [];

  return (
    <Wrapper {...wrapperProps}>
      <Card className="h-min px-0 py-0 hover:border-gray-400">
        <VoteButtons post={post} />
        <CardContent className="pt-2">
          <PostHeader post={post} />
          <Flex className="my-1 flex-col gap-1">
            <Heading variant="h5">
              {post.title}{' '}
              {tagsMapped.map(({ label, color }) => (
                <Tag label={label} color={color} />
              ))}
            </Heading>
            <Text clamp={!isDetail} variant="p4">
              {post.content}
            </Text>
          </Flex>
          <PostFooter post={post} />
        </CardContent>
      </Card>
    </Wrapper>
  );
};
