import { graphql } from 'relay-runtime';

export const PostCreate = graphql`
  mutation PostCreateMutation(
    $title: String!
    $content: String!
    $community: ID!
  ) {
    postCreateMutation(
      input: { title: $title, content: $content, community: $community }
    ) {
      postEdge {
        node {
          id
        }
      }
    }
  }
`;
