import { Flex } from '@violetit/ui';
import { useLazyLoadQuery } from 'react-relay';
import { graphql } from 'relay-runtime';

import { PostComposerPageQuery } from './__generated__/PostComposerPageQuery.graphql';
import { PostComposer } from './PostComposer';

const postComposerPageQuery = graphql`
  query PostComposerPageQuery($filters: CommunityFilters) {
    ...PostComposer_query @arguments(filters: $filters)
  }
`;

export const PostComposerPage = () => {
  const data = useLazyLoadQuery<PostComposerPageQuery>(postComposerPageQuery, { filters: { joinedByMe: true } });

  return (
    <Flex className="m-2 w-auto">
      <PostComposer query={data} />
    </Flex>
  );
};
