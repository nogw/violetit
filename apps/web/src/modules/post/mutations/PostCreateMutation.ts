import { graphql } from 'relay-runtime';

export const PostCreate = graphql`
  mutation PostCreateMutation($title: String!, $content: String!, $community: String!) {
    postCreate(input: { title: $title, content: $content, community: $community }) {
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
