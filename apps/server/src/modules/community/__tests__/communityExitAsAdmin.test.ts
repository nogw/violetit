import { graphql } from 'graphql';

import {
  clearDatabaseAndRestartCounters,
  connectWithMongoose,
  disconnectWithMongoose,
  sanitizeTestObject,
} from '../../../../test';
import { createCommunityWithAdmin } from '../fixtures/createCommunityWithAdmin';
import { schema } from '../../../schema/schema';
import { getContext } from '../../../context';
import { createUser } from '../../user/fixtures/createUser';

beforeAll(connectWithMongoose);

beforeEach(clearDatabaseAndRestartCounters);

afterAll(disconnectWithMongoose);

describe('CommunityExitAsAdminMutation', () => {
  it('should exit a community as admin', async () => {
    const { user, community } = await createCommunityWithAdmin({ name: 'NogwCommunity' });

    const mutation = `
      mutation CommunityExitAsAdmin($communityId: String!) {
        communityExitAsAdmin(input: { communityId: $communityId }) {
          error {
            message
          }
          communityEdge {
            node {
              id,
              members(first: 10) {
                edges {
                  node {
                    id
                  }
                }
              }
            }
          }
        }
      }
    `;

    const contextValue = getContext({ user });

    const variableValues = {
      communityId: community._id.toString(),
    };

    const result = await graphql({
      schema,
      source: mutation,
      contextValue,
      variableValues,
    });

    expect(result.errors).toBeUndefined();
    expect(result.data.communityExitAsAdmin.error).toBeNull();
    expect(result.data.communityExitAsAdmin.communityEdge).toBeNull();
    expect(sanitizeTestObject(result.data, ['id'])).toMatchSnapshot();
  });

  it('should not exit if user is not a community admin', async () => {
    const { community } = await createCommunityWithAdmin({ name: 'NogwCommunity' });

    const user = await createUser();

    const mutation = `
      mutation CommunityExitAsAdmin($communityId: String!) {
        communityExitAsAdmin(input: { communityId: $communityId }) {
          error {
            message
          }
          communityEdge {
            node {
              id
            }
          }
        }
      }
    `;

    const contextValue = getContext({ user });

    const variableValues = {
      communityId: community._id.toString(),
    };

    const result = await graphql({
      schema,
      source: mutation,
      contextValue,
      variableValues,
    });

    expect(result.errors).toBeUndefined();
    expect(result.data.communityExitAsAdmin.communityEdge).toBeNull();
    expect(result.data.communityExitAsAdmin.error.message).toBe('You are not a member of this community');
    expect(sanitizeTestObject(result.data, ['id'])).toMatchSnapshot();
  });
});
