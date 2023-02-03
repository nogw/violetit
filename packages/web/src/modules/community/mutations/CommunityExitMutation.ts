import { graphql } from 'relay-runtime';

export const CommunityExit = graphql`
  mutation CommunityExitMutation($input: CommunityExitInput!) {
    communityExit(input: $input) {
      community {
        id @deleteRecord
      }
    }
  }
`;
