import { graphql } from 'react-relay';

export const VoteCreate = graphql`
  mutation VoteCreateMutation($input: VoteCreateInput!) {
    VoteCreate(input: $input) {
      post {
        votesCount
        meHasVoted {
          type
        }
      }
    }
  }
`;
