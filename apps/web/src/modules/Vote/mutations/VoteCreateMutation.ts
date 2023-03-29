import { graphql } from 'react-relay';

export const VoteCreate = graphql`
  mutation VoteCreateMutation($input: VoteCreateInput!) {
    voteCreate(input: $input) {
      error {
        field
        message
      }
      post {
        votesCount
        meHasVoted {
          type
        }
      }
    }
  }
`;
