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

describe('tagCreateMutation', () => {
  it('should create a tag', async () => {
    const { user, community } = await createCommunityWithAdmin();

    const mutation = `
      mutation TagCreateMutation($label: String!, $color: String!, $communityId: String!) {
        tagCreateMutation(input: { label: $label, color: $color, communityId: $communityId }) {
          error {
            message
          }
          success
          tagEdge {
            node {
              id
              label
            }
          }
        }
      }
    `;

    const contextValue = getContext({ user });

    const variableValues = {
      label: 'awesome tag',
      color: 'green',
      communityId: community._id.toString(),
    };

    const result = await graphql({
      schema,
      source: mutation,
      contextValue,
      variableValues,
    });

    expect(result.errors).toBeUndefined();
    expect(result.data.tagCreateMutation.error).toBeNull();
    expect(result.data.tagCreateMutation.success).toBeDefined();
    expect(result.data.tagCreateMutation.tagEdge.node.id).toBeDefined();
    expect(result.data.tagCreateMutation.tagEdge.node.label).toBe(variableValues.label);
    expect(sanitizeTestObject(result.data, ['id'])).toMatchSnapshot();
  });

  it('should not create a tag if there is another with the same label', async () => {
    const { user, community } = await createCommunityWithAdmin();

    const tag = await createTag({
      label: 'awesome tag',
      community: community._id,
    });

    const mutation = `
      mutation TagCreateMutation($label: String!, $color: String!, $communityId: String!) {
        tagCreateMutation(input: { label: $label, color: $color, communityId: $communityId }) {
          error {
            message
          }
          tagEdge {
            node {
              id
            }
          }
        }
      }
    `;

    const contextValue = getContext({ user });

    const variableValues = {
      label: tag.label,
      color: 'green',
      communityId: community._id.toString(),
    };

    const result = await graphql({
      schema,
      source: mutation,
      contextValue,
      variableValues,
    });

    expect(result.errors).toBeUndefined();
    expect(result.data.tagCreateMutation.tagEdge).toBeNull();
    expect(result.data.tagCreateMutation.error.message).toBe('A tag with that name has already been created');
    expect(sanitizeTestObject(result.data)).toMatchSnapshot();
  });

  it('should not create a tag if user is not admin or mod', async () => {
    const { community } = await createCommunityWithAdmin();

    const user = await createUser();

    const mutation = `
      mutation TagCreateMutation($label: String!, $color: String!, $communityId: String!) {
        tagCreateMutation(input: { label: $label, color: $color, communityId: $communityId }) {
          error {
            message
          }
          tagEdge {
            node {
              id
            }
          }
        }
      }
    `;

    const contextValue = getContext({ user });

    const variableValues = {
      label: 'awesome tag',
      color: 'green',
      communityId: community._id.toString(),
    };

    const result = await graphql({
      schema,
      source: mutation,
      contextValue,
      variableValues,
    });

    expect(result.errors).toBeUndefined();
    expect(result.data.tagCreateMutation.tagEdge).toBeNull();
    expect(result.data.tagCreateMutation.error.message).toBe('You are not allowed to create tags');
    expect(sanitizeTestObject(result.data)).toMatchSnapshot();
  });
});
