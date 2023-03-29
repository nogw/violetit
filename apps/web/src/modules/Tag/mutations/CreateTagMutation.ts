import { graphql } from 'react-relay';

export const CreateTag = graphql`
  mutation CreateTagMutation($input: TagCreateInput!) {
    tagCreateMutation(input: $input) {
      error {
        field
        message
      }
      success
      tagEdge {
        node {
          id
          label
          color
        }
      }
    }
  }
`;
