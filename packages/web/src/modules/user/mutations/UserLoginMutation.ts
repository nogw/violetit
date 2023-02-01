import { graphql } from 'relay-runtime';

export const UserLogin = graphql`
  mutation UserLoginMutation($email: String!, $password: String!) {
    userLoginMutation(input: { email: $email, password: $password }) {
      token
      me {
        username
        email
      }
    }
  }
`;
