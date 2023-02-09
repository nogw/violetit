import { Card, CardContent } from '@violetit/ui';
import { Link } from '@/shared-components/Link';

import { graphql, useFragment } from 'react-relay';
import { Fragment } from 'react';

import { PostDetail_post$key } from './__generated__/PostDetail_post.graphql';
import { VoteButtons } from '../vote/VoteButtons';
import PostHeader from './PostHeader';

type WrapperProps = {
  children: React.ReactElement;
  to?: string;
};

type PostDetailProps = {
  post: PostDetail_post$key;
  isDetail?: boolean;
};

const Wrapper = ({ to, children }: WrapperProps) => {
  if (to) {
    return <Link to={to}>{children}</Link>;
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
        ...VoteButtons_post
        ...PostHeader_post
      }
    `,
    props.post,
  );

  const wrapperProps = isDetail ? {} : { to: `/post/${post.id}` };
  const wrapperContentClsx = isDetail ? 'text-sm' : 'line-clamp-3 text-sm';

  return (
    <Wrapper {...wrapperProps}>
      <Card className="hover:border-gray-400">
        <VoteButtons post={post} />
        <CardContent className="flex-col">
          <PostHeader post={post} />
          <h1 className="font-medium text-base my-2">{post.title}</h1>
          <p className={wrapperContentClsx}>{post.content}</p>
        </CardContent>
      </Card>
    </Wrapper>
  );
};
