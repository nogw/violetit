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
        VoteCreate(input: { postId: $postId, type: $type }) {
          post {
            id
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

    const result = await graphql({
      schema,
      source: mutation,
      contextValue: getContext({ user: user }),
      variableValues,
    });

    expect(result.errors).toBeUndefined();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { post: postLiked, vote } = result.data.VoteCreate;

    expect(vote.node.type).toBe('UPVOTE');
    expect(postLiked.votesCount).toBe(1);
  });

  it("should not create a post if doesn't have authorization header", async () => {
    const post = await createPost();

    const mutation = `
      mutation VoteCreateMutation($postId: String!, $type: VoteType!) {
        VoteCreate(input: { postId: $postId, type: $type }) {
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

    const result = await graphql({
      schema,
      source: mutation,
      variableValues,
    });

    expect(result.data?.VoteCreate).toBeNull();
    expect(result.errors).toBeDefined();
    expect(result.errors && result.errors[0].message).toBe('You are not logged in!');
  });
});
