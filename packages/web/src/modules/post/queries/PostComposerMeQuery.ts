import { graphql } from 'relay-runtime';

export const PostComposerMe = graphql`
  query PostComposerMeQuery {
    me {
      communities {
        edges {
          node {
            id
            name
          }
        }
      }
    }
  }
`;
