import { graphql } from 'relay-runtime';

export const UserLogin = graphql`
  mutation UserLoginMutation($email: String!, $password: String!) {
    userLogin(input: { email: $email, password: $password }) {
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
