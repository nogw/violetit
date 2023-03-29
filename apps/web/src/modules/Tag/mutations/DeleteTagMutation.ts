import { graphql } from 'react-relay';

export const DeleteTag = graphql`
  mutation DeleteTagMutation($input: TagDeleteInput!) {
    tagDeleteMutation(input: $input) {
      error {
        field
        message
      }
      success
    }
  }
`;
