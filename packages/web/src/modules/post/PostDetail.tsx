import React from 'react';

import { Card, CardContent } from '@violetit/ui';
import { Link } from '@/shared-components/Link';

import { graphql, useFragment } from 'react-relay';

import { PostDetail_post$key } from './__generated__/PostDetail_post.graphql';

import { VoteButtons } from '../vote/VoteButtons';
import PostHeader from './PostHeader';

type PostDetailProps = {
  post: PostDetail_post$key;
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
        votesCount
        ...PostHeader_post
      }
    `,
    props.post,
  );

  const Wrapper = isDetail
    ? { Component: React.Fragment, props: { to: {} } }
    : { Component: Link, props: { to: `/post/${post.id}`, className: '' } };

  const PostContentWrapper = isDetail
    ? { className: 'text-sm' }
    : { className: 'line-clamp-3 text-sm my-2' };

  return (
    <Wrapper.Component {...Wrapper.props}>
      <Card className="py-2 my-3 rounded border border-solid border-gray-200 hover:border-gray-400">
        <VoteButtons votes={post.votesCount} postId="test" />
        <CardContent className="flex-col">
          <PostHeader post={post} />
          <h1 className="font-medium text-base my-2">{post.title}</h1>
          <p {...PostContentWrapper}>{post.content}</p>
        </CardContent>
      </Card>
    </Wrapper.Component>
  );
};
