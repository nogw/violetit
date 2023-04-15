import { graphql } from 'relay-runtime';
import { SignInMutation as SignInMutationType } from 'src/__generated__/SignInMutation.graphql';

const SignInMutation = graphql`
  mutation SignInMutation($input: UserLoginInput!) {
    userLogin(input: $input) {
      token
      success
      error {
        field
        message
      }
      me {
        username
        email
      }
    }
  }
`;

export { SignInMutation };
export type { SignInMutationType };
