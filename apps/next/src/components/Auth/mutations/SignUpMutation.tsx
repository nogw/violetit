import { graphql } from 'relay-runtime';
import { SignUpMutation as SignUpMutationType } from 'src/__generated__/SignUpMutation.graphql';

const SignUpMutation = graphql`
  mutation SignUpMutation($input: UserRegisterInput!) {
    userRegister(input: $input) {
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

export { SignUpMutation };
export type { SignUpMutationType };
