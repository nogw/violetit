import { graphql } from 'relay-runtime';

export const CommunityJoin = graphql`
  mutation CommunityJoinMutation($input: CommunityJoinInput!) {
    communityJoin(input: $input) {
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
