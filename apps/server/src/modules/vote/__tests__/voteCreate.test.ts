import { graphql } from 'graphql';

import {
  clearDbAndRestartCounters,
  connectWithMongoose,
  disconnectWithMongoose,
  sanitizeTestObject,
} from '../../../../test';
import { createPost } from '../../post/fixtures/createPost';
import { createUser } from '../../user/fixtures/createUser';
import { getContext } from '../../../context';
import { schema } from '../../../schema/schema';

beforeAll(connectWithMongoose);

beforeEach(clearDbAndRestartCounters);

afterAll(disconnectWithMongoose);

describe('VoteCreateMutation', () => {
  it('should upvote a post', async () => {
    const user = await createUser();
    const post = await createPost();

    const mutation = `
      mutation VoteCreateMutation($postId: String!, $type: VoteType!) {
        voteCreate(input: { postId: $postId, type: $type }) {
          error {
            message
          }
          post {
            votesCount
          }
          vote {
            node {
              type
            }
          }
        }
      }
    `;

    const contextValue = getContext({ user: user });

    const variableValues = {
      postId: post._id.toString(),
      type: 'UPVOTE',
    };

    const result = await graphql({
      schema,
      source: mutation,
      contextValue,
      variableValues,
    });

    expect(result.errors).toBeUndefined();
    expect(result.data.voteCreate.error).toBeNull();
    expect(result.data.voteCreate.vote.node.type).toBe('UPVOTE');
    expect(result.data.voteCreate.post.votesCount).toBe(1);
    expect(sanitizeTestObject(result.data)).toMatchSnapshot();
  });

  it('should not vote for the same post more than once', async () => {
    const user = await createUser();
    const post = await createPost();

    const mutation = `
      mutation VoteCreateMutation($postId: String!, $type: VoteType!) {
        voteCreate(input: { postId: $postId, type: $type }) {
          error {
            message
          }
          post {
            votesCount
          }
          vote {
            node {
              type
            }
          }
        }
      }
    `;

    const contextValue = getContext({ user: user });

    const variableValues = {
      postId: post._id.toString(),
      type: 'UPVOTE',
    };

    await graphql({
      schema,
      source: mutation,
      contextValue,
      variableValues,
    });

    const result = await graphql({
      schema,
      source: mutation,
      contextValue,
      variableValues,
    });

    expect(result.errors).toBeUndefined();
    expect(result.data.voteCreate.error).toBeNull();
    expect(result.data.voteCreate.vote.node.type).toBe('UPVOTE');
    expect(result.data.voteCreate.post.votesCount).toBe(1);
    expect(sanitizeTestObject(result.data)).toMatchSnapshot();
  });

  it("should not create a post if doesn't have authorization header", async () => {
    const post = await createPost();

    const mutation = `
      mutation VoteCreateMutation($postId: String!, $type: VoteType!) {
        voteCreate(input: { postId: $postId, type: $type }) {
          error {
            message
          }
          post {
            id
          }
        }
      }
    `;

    const contextValue = getContext();

    const variableValues = {
      postId: post._id.toString(),
      type: 'UPVOTE',
    };

    const result = await graphql({
      schema,
      source: mutation,
      contextValue,
      variableValues,
    });

    expect(result.errors).toBeUndefined();
    expect(result.data.voteCreate.post).toBeNull();
    expect(result.data.voteCreate.error.message).toBe('You are not logged in!');
    expect(sanitizeTestObject(result.data)).toMatchSnapshot();
  });
});
