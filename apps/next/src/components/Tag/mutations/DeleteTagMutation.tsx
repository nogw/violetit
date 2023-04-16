import { graphql } from 'react-relay';

const DeleteTag = graphql`
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

export { DeleteTag };
