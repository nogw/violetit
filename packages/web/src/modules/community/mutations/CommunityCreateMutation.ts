import { graphql } from 'relay-runtime';

export const CommunityCreate = graphql`
  mutation CommunityCreateMutation($name: String!, $title: String!) {
    communityCreate(input: { name: $name, title: $title }) {
      communityEdge {
        node {
          id
        }
      }
    }
  }
`;
