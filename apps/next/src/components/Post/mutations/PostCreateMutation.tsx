import { graphql } from 'relay-runtime';

const PostCreate = graphql`
  mutation PostCreateMutation($input: PostCreateInput!) {
    postCreate(input: $input) {
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

export { PostCreate };
