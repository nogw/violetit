import { Card, CardContent, Flex, Heading, Tag, Text } from '@violetit/ui';

import { graphql, useFragment } from 'react-relay';
import { Fragment } from 'react';

import { PostDetail_post$key } from './__generated__/PostDetail_post.graphql';
import { VoteButtons } from '../Vote/VoteButtons';
import { PostHeader } from './PostHeader';
import { PostFooter } from './PostFooter';
import { Link } from '../../common/Link';

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
          id
          label
          color
        }
        ...VoteButtons_post
        ...PostHeader_post
        ...PostFooter_post
      }
    `,
    props.post,
  );

  const wrapperProps = isDetail ? {} : { to: `/r/${post.community?.id}/p/${post.id}` };

  const tagsMapped = post.tags ? post.tags.flatMap(edge => (edge ? edge : [])) : [];

  return (
    <Wrapper {...wrapperProps}>
      <Card className="h-min px-0 py-0 hover:border-gray-400">
        <VoteButtons post={post} />
        <CardContent className="pt-2">
          <PostHeader post={post} />
          <Flex direction="col" className="my-1 gap-1">
            <Heading variant="h5">
              {post.title}{' '}
              {tagsMapped.map(({ id, label, color }) => (
                <Link underline={false} key={id} to={`/r/${post.community?.id}/${id}`}>
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
      </Card>
    </Wrapper>
  );
};
