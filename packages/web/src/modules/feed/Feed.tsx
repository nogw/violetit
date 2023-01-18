import { graphql } from 'relay-runtime';

import FeedList from './FeedList';

const feedPostsLazyLoadQuery = graphql`
  query FeedPostsQuery {
    ...FeedList_query
    me {
      id
    }
  }
`;

const Feed = () => {
  return <FeedList lazyLoadQuery={feedPostsLazyLoadQuery} />;
};

export default Feed;
