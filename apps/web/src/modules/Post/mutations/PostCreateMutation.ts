import { graphql } from 'relay-runtime';

export const PostCreate = graphql`
  mutation PostCreateMutation($tags: [ID!]!, $title: String!, $content: String!, $community: String!) {
    postCreate(input: { tags: $tags, title: $title, content: $content, community: $community }) {
      error {
        field
        message
      }
      postEdge {
        node {
          id
          community {
            id
          }
        }
      }
    }
  }
`;
