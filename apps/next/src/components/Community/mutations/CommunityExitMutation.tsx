import { graphql } from 'relay-runtime';

export const CommunityExit = graphql`
  mutation CommunityExitMutation($input: CommunityExitInput!) {
    communityExit(input: $input) {
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
