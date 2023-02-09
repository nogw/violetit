import { useLazyLoadQuery } from 'react-relay';
import { useParams } from 'react-router-dom';
import { graphql } from 'relay-runtime';

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

const PostDetailPage = () => {
  const { community, post } = useParams();

  const data = useLazyLoadQuery<PostPageQuery>(PostPage, { id: String(post) });

  if (!data || !data.post) {
    return null;
  }

  return (
    <CommunityLayout id={String(community)}>
      <PostDetail post={data.post} isDetail />
    </CommunityLayout>
  );
};

export default PostDetailPage;
