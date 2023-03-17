import { graphql } from 'relay-runtime';

export const UserLogin = graphql`
  mutation UserLoginMutation($email: String!, $password: String!) {
    userLogin(input: { email: $email, password: $password }) {
      token
      me {
        username
        email
      }
    }
  }
`;
