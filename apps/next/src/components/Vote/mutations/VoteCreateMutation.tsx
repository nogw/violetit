import { graphql } from 'react-relay';

const VoteCreate = graphql`
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

export { VoteCreate };
