import { graphql } from 'relay-runtime';

export const CommunityCreate = graphql`
  mutation CommunityCreateMutation($input: CommunityCreateInput!) {
    communityCreate(input: $input) {
      error {
        field
        message
      }
      communityEdge {
        node {
          id
        }
      }
    }
  }
`;
