import { graphql } from 'relay-runtime';

import { PostComposer } from './post/PostComposer';
import { FeedList } from './FeedList';

const feedPostsLazyLoadQuery = graphql`
  query FeedPostsQuery {
    ...FeedList_query
    me {
      id
    }
  }
`;

const Feed = () => {
  return (
    <div className="px-4">
      <PostComposer />
      <FeedList lazyLoadQuery={feedPostsLazyLoadQuery} />
    </div>
  );
};

export default Feed;
