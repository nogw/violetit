import { graphql } from 'graphql';

import { clearDatabaseAndRestartCounters, connectWithMongoose, disconnectWithMongoose } from '../../../../test';
import { getContext } from '../../../context';
import { schema } from '../../../schema/schema';

import { createCommunity } from '../../community/fixtures/createCommunity';

beforeAll(connectWithMongoose);

beforeEach(clearDatabaseAndRestartCounters);

afterAll(disconnectWithMongoose);

describe('postCreateMutation', () => {
  it('should create a post', async () => {
    const { user, community } = await createCommunity();

    const mutation = `
      mutation PostCreateMutation($title: String!, $content: String!, $community: String!) {
        postCreateMutation(input: { title: $title, content: $content, community: $community }) {
          postEdge {
            node {
              id
              title
              content
              author {
                username
              }
            }
          }
        }
      }
    `;

    const variableValues = {
      title: 'Post Title',
      content: 'Post Content',
      community: community._id.toString(),
    };

    const result = await graphql({
      schema,
      source: mutation,
      contextValue: getContext({ user }),
      variableValues,
    });

    expect(result.errors).toBeUndefined();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { postEdge } = result.data.postCreateMutation;

    expect(postEdge.node.id).toBeDefined();
    expect(postEdge.node.title).toBe(variableValues.title);
    expect(postEdge.node.content).toBe(variableValues.content);
    expect(postEdge.node.author.username).toBe(user.username);
  });

  it("should not create a post if doesn't have authorization header", async () => {
    const community = (await createCommunity()).community;

    const mutation = `
      mutation PostCreateMutation($title: String!, $content: String!, $community: String!) {
        postCreateMutation(input: { title: $title, content: $content, community: $community }) {
          postEdge {
            node {
              id
            }
          }
        }
      }
    `;

    const variableValues = {
      title: 'Post Title',
      content: 'Post Content',
      community: community._id.toString(),
    };

    const result = await graphql({
      schema,
      source: mutation,
      variableValues,
    });

    expect(result.data?.postCreateMutation).toBeNull();
    expect(result.errors).toBeDefined();
    expect(result.errors && result.errors[0].message).toBe('You are not logged in!');
  });

  it('should not create a post if the community does not exists', async () => {
    const user = (await createCommunity()).user;

    const mutation = `
      mutation PostCreateMutation($title: String!, $content: String!, $community: String!) {
        postCreateMutation(input: { title: $title, content: $content, community: $community }) {
          postEdge {
            node {
              id
            }
          }
        }
      }
    `;

    const variableValues = {
      title: 'Post Title',
      content: 'Post Content',
      community: '123',
    };

    const result = await graphql({
      schema,
      source: mutation,
      contextValue: getContext({ user }),
      variableValues,
    });

    expect(result.data?.postCreateMutation).toBeNull();
    expect(result.errors).toBeDefined();
    expect(result.errors && result.errors[0].message).toBe('Community not found!');
  });
});
