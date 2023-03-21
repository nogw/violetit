import { graphql } from 'graphql';

import {
  clearDbAndRestartCounters,
  connectWithMongoose,
  disconnectWithMongoose,
  sanitizeTestObject,
} from '../../../../test';
import { getContext } from '../../../context';
import { schema } from '../../../schema/schema';

import { createCommunityWithAdmin } from '../../community/fixtures/createCommunityWithAdmin';

beforeAll(connectWithMongoose);

beforeEach(clearDbAndRestartCounters);

afterAll(disconnectWithMongoose);

describe('postCreateMutation', () => {
  it('should create a post', async () => {
    const { user, community } = await createCommunityWithAdmin();

    const mutation = `
      mutation PostCreateMutation($title: String!, $content: String!, $community: String!) {
        postCreate(input: { title: $title, content: $content, community: $community }) {
          error {
            message
          }
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

    const contextValue = getContext({ user });

    const variableValues = {
      title: 'Post Title',
      content: 'Post Content',
      community: community._id.toString(),
    };

    const result = await graphql({
      schema,
      source: mutation,
      contextValue,
      variableValues,
    });

    expect(result.errors).toBeUndefined();
    expect(result.data.postCreate.error).toBeNull();
    expect(result.data.postCreate.postEdge.node.id).toBeDefined();
    expect(result.data.postCreate.postEdge.node.title).toBe(variableValues.title);
    expect(result.data.postCreate.postEdge.node.content).toBe(variableValues.content);
    expect(result.data.postCreate.postEdge.node.author.username).toBe(user.username);
    expect(sanitizeTestObject(result.data, ['id'])).toMatchSnapshot();
  });

  it("should not create a post if doesn't have authorization header", async () => {
    const community = (await createCommunityWithAdmin()).community;

    const mutation = `
      mutation PostCreateMutation($title: String!, $content: String!, $community: String!) {
        postCreate(input: { title: $title, content: $content, community: $community }) {
          error {
            message
          }
          postEdge {
            node {
              id
            }
          }
        }
      }
    `;

    const contextValue = getContext();

    const variableValues = {
      title: 'Post Title',
      content: 'Post Content',
      community: community._id.toString(),
    };

    const result = await graphql({
      schema,
      source: mutation,
      contextValue,
      variableValues,
    });

    expect(result.errors).toBeUndefined();
    expect(result.data.postCreate.postEdge).toBeNull();
    expect(result.data.postCreate.error.message).toBe('You are not logged in!');
    expect(sanitizeTestObject(result.data)).toMatchSnapshot();
  });

  it('should not create a post if the community does not exists', async () => {
    const user = (await createCommunityWithAdmin()).user;

    const mutation = `
      mutation PostCreateMutation($title: String!, $content: String!, $community: String!) {
        postCreate(input: { title: $title, content: $content, community: $community }) {
          error {
            message
          }
          postEdge {
            node {
              id
            }
          }
        }
      }
    `;

    const contextValue = getContext({ user });

    const variableValues = {
      title: 'Post Title',
      content: 'Post Content',
      community: '123',
    };

    const result = await graphql({
      schema,
      source: mutation,
      contextValue,
      variableValues,
    });

    expect(result.errors).toBeUndefined();
    expect(result.data.postCreate.postEdge).toBeNull();
    expect(result.data.postCreate.error.message).toBe('Community not found!');
    expect(sanitizeTestObject(result.data)).toMatchSnapshot();
  });
});
