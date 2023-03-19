import { graphql } from 'graphql';

import { clearDatabaseAndRestartCounters, connectWithMongoose, disconnectWithMongoose } from '../../../../test';
import { createPost } from '../../post/fixtures/createPost';
import { createUser } from '../../user/fixtures/createUser';
import { getContext } from '../../../context';
import { schema } from '../../../schema/schema';

beforeAll(connectWithMongoose);

beforeEach(clearDatabaseAndRestartCounters);

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

    const variableValues = {
      postId: post._id.toString(),
      type: 'UPVOTE',
    };

    const contextValue = getContext({ user: user });

    const result = await graphql({
      schema,
      source: mutation,
      contextValue,
      variableValues,
    });

    expect(result.errors).toBeUndefined();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { post: postLiked, vote, error } = result.data.voteCreate;

    expect(error).toBeNull();
    expect(vote.node.type).toBe('UPVOTE');
    expect(postLiked.votesCount).toBe(1);
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

    const variableValues = {
      postId: post._id.toString(),
      type: 'UPVOTE',
    };

    const contextValue = getContext({ user: user });

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

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { post: postLiked, vote, error } = result.data.voteCreate;

    expect(error).toBeNull();
    expect(vote.node.type).toBe('UPVOTE');
    expect(postLiked.votesCount).toBe(1);
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

    const variableValues = {
      postId: post._id.toString(),
      type: 'UPVOTE',
    };

    const contextValue = getContext();

    const result = await graphql({
      schema,
      source: mutation,
      contextValue,
      variableValues,
    });

    expect(result.errors).toBeUndefined();
    expect(result.data.voteCreate.post).toBeNull();
    expect(result.data.voteCreate.error.message).toBe('You are not logged in!');
  });
});
