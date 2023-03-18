import { graphql } from 'relay-runtime';

export const UserRegister = graphql`
  mutation UserRegisterMutation($username: String!, $email: String!, $password: String!) {
    userRegister(input: { username: $username, email: $email, password: $password }) {
      token
      success
      error {
        field
        message
      }
      me {
        id
        username
        email
      }
    }
  }
`;
