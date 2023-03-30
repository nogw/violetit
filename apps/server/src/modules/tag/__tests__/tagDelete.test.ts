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
import { createUser } from '../../user/fixtures/createUser';
import { createTag } from '../fixtures/createTag';

beforeAll(connectWithMongoose);

beforeEach(clearDbAndRestartCounters);

afterAll(disconnectWithMongoose);

describe('tagDeleteMutation', () => {
  it('should delete a tag', async () => {
    const { user, community } = await createCommunityWithAdmin();

    const tag = await createTag({
      label: 'awesome tag',
      community: community._id,
    });

    const mutation = `
      mutation TagDeleteMutation($tagId: String!, $communityId: String!) {
        tagDeleteMutation(input: { tagId: $tagId, communityId: $communityId }) {
          error {
            message
          }
          success
        }
      }
    `;

    const contextValue = getContext({ user });

    const variableValues = {
      tagId: tag._id.toString(),
      communityId: community._id.toString(),
    };

    const result = await graphql({
      schema,
      source: mutation,
      contextValue,
      variableValues,
    });

    expect(result.errors).toBeUndefined();
    expect(result.data.tagDeleteMutation.error).toBeNull();
    expect(result.data.tagDeleteMutation.success).toBeDefined();
    expect(sanitizeTestObject(result.data)).toMatchSnapshot();
  });

  it('should not delete a tag if user is not admin or mod', async () => {
    const { community } = await createCommunityWithAdmin();

    const user = await createUser();

    const tag = await createTag({
      label: 'awesome tag',
      community: community._id,
    });

    const mutation = `
      mutation TagDeleteMutation($tagId: String!, $communityId: String!) {
        tagDeleteMutation(input: { tagId: $tagId, communityId: $communityId }) {
          error {
            message
          }
        }
      }
    `;

    const contextValue = getContext({ user });

    const variableValues = {
      tagId: tag._id.toString(),
      communityId: community._id.toString(),
    };

    const result = await graphql({
      schema,
      source: mutation,
      contextValue,
      variableValues,
    });

    expect(result.errors).toBeUndefined();
    expect(result.data.tagDeleteMutation.error.message).toBe('You are not allowed to delete tags');
    expect(sanitizeTestObject(result.data)).toMatchSnapshot();
  });
});
