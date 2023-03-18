import { useLazyLoadQuery } from 'react-relay';
import { useParams } from 'react-router-dom';
import { graphql } from 'relay-runtime';

import { ErrorText } from '@violetit/ui';

import { CommunityLayout } from '../community/CommunityLayout';
import { PostPageQuery } from './__generated__/PostPageQuery.graphql';
import { PostDetail } from './PostDetail';

const PostPage = graphql`
  query PostPageQuery($id: ID!) {
    post: node(id: $id) {
      ...PostDetail_post
    }
  }
`;

export const PostDetailPage = () => {
  const { community, post } = useParams();

  const data = useLazyLoadQuery<PostPageQuery>(PostPage, { id: String(post) });

  if (!data || !data.post) {
    return <ErrorText>Post not found</ErrorText>;
  }

  return (
    <CommunityLayout id={String(community)}>
      <PostDetail isDetail post={data.post} />
    </CommunityLayout>
  );
};
